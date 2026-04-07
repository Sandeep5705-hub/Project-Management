const Task = require('../models/Task');
const ProjectMember = require('../models/ProjectMember');
const mongoose = require('mongoose');

exports.createTask = async (req, res) => {
  try {
    const { projectId, title, description, category, deadline } = req.body;
    
    // Explicitly cast to ObjectId for robust querying
    const pId = new mongoose.Types.ObjectId(projectId);
    const uId = new mongoose.Types.ObjectId(req.user.id);

    const membership = await ProjectMember.findOne({ userId: uId, projectId: pId });
    
    if (!membership || (membership.role !== 'owner' && membership.role !== 'guide')) {
      return res.status(403).json({ error: 'Unauthorized: Only Owners or Guides can create tasks' });
    }

    const task = new Task({
      project: pId,
      title,
      description,
      category,
      deadline,
      createdByRole: membership.role,
      createdBy: uId
    });
    
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error('Task Creation Error:', err.message);
    res.status(500).json({ error: 'System Error: ' + err.message });
  }
};

exports.getProjectTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.query.projectId })
        .populate('createdBy', 'name')
        .populate('submissions.userId', 'name');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.submitWork = async (req, res) => {
    try {
        const { githubLink, fileName } = req.body;
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });

        task.submissions.push({
            userId: req.user.id,
            githubLink,
            fileName,
            submittedAt: new Date()
        });

        // Automatically mark as completed upon submission
        task.status = 'Completed';

        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const membership = await ProjectMember.findOne({ userId: req.user.id, projectId: task.project });
    if (!membership) return res.status(403).json({ error: 'Access denied' });

    task.status = status;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        const membership = await ProjectMember.findOne({ userId: req.user.id, projectId: task.project });
        
        if (!membership || (membership.role !== 'owner' && membership.role !== 'guide')) {
            return res.status(403).json({ error: 'Unauthorized delete' });
        }

        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.quickSubmit = async (req, res) => {
    try {
        const { projectId, title, category, githubLink, fileName } = req.body;
        console.log(`[QUICK SUBMIT] Incoming: ${title} for Project ${projectId}`);

        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'User session expired. Please re-login.' });
        }

        if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({ error: 'Invalid or missing Project ID' });
        }

        const pId = new mongoose.Types.ObjectId(projectId);
        const uId = new mongoose.Types.ObjectId(req.user.id);
        
        let task = await Task.findOne({ project: pId, title });
        
        if (!task) {
            task = new Task({
                project: pId,
                title,
                category,
                createdBy: uId,
                status: 'Completed'
            });
        }

        task.submissions.push({
            userId: uId,
            githubLink,
            fileName,
            submittedAt: new Date()
        });

        task.status = 'Completed';
        await task.save();
        
        console.log(`[QUICK SUBMIT] Success: ${title} saved.`);
        res.json(task);
    } catch (err) {
        console.error('[QUICK SUBMIT ERROR]:', err.message);
        res.status(500).json({ error: 'Server DB Error: ' + err.message });
    }
};
