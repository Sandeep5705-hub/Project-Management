const Project = require('../models/Project');
const ProjectMember = require('../models/ProjectMember');
const Task = require('../models/Task');

const DEFAULT_TASKS = [
    { title: 'Uploading Files', category: 'Research', priority: 'Medium', quizStatus: 'Quiz Taken', description: 'Upload research papers, links, and reference materials.' },
    { title: 'User Interviews', category: 'Research', priority: 'High', description: 'Upload interviews, transcripts or notes.' },
    { title: 'PPT Submission', category: 'Design', priority: 'Low', description: 'Conceptual presentation of the system (PPT/GitHub).' },
    { title: 'Code Submission', category: 'Development', priority: 'High', description: 'Initial implementation and repository uploads.' },
    { title: 'Testing & Results', category: 'Testing', priority: 'Medium', description: 'Upload unit test results and documentation.' },
    { title: 'Final Documentation', category: 'Documentation', priority: 'High', description: 'Complete project report and final summary.' }
];

exports.createProject = async (req, res) => {
  try {
    const { 
        title, 
        description, 
        problemStatement, 
        technologies, 
        startDate, 
        endDate, 
        teamMemberNames, 
        guideName 
    } = req.body;
    
    // Generate unique IDs
    const teamInviteId = 'TEAM' + Math.random().toString(36).substring(2, 6).toUpperCase();
    const guideInviteId = 'GUIDE' + Math.random().toString(36).substring(2, 6).toUpperCase();
    
    const project = new Project({
      title,
      description,
      problemStatement,
      technologies,
      startDate,
      endDate,
      teamMemberNames: Array.isArray(teamMemberNames) ? teamMemberNames : teamMemberNames?.split(',').map(n => n.trim()),
      memberCount: Array.isArray(teamMemberNames) ? teamMemberNames.length : teamMemberNames?.split(',').length || 1,
      guideName,
      teamInviteId,
      guideInviteId,
      ownerId: req.user.id
    });
    
    await project.save();

    // Create owner entry in ProjectMembers
    await ProjectMember.create({
      userId: req.user.id,
      projectId: project._id,
      role: 'owner'
    });

    // AUTO-SEED DEFAULT TASKS
    const tasksToCreate = DEFAULT_TASKS.map(task => ({
        ...task,
        project: project._id,
        createdBy: req.user.id,
        createdByRole: 'owner',
        deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 1 week from now
    }));
    await Task.insertMany(tasksToCreate);

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.joinProject = async (req, res) => {
  try {
    const { inviteId, role } = req.body;
    const query = role === 'guide' ? { guideInviteId: inviteId } : { teamInviteId: inviteId };
    const project = await Project.findOne(query);
    if (!project) return res.status(404).json({ error: 'Invalid Invite ID' });
    const existing = await ProjectMember.findOne({ userId: req.user.id, projectId: project._id });
    if (existing) return res.status(400).json({ error: 'Already joined this project' });
    const newMember = await ProjectMember.create({
      userId: req.user.id,
      projectId: project._id,
      role: role
    });
    res.json({ project, role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyProjects = async (req, res) => {
  try {
    const memberships = await ProjectMember.find({ userId: req.user.id }).populate('projectId');
    const projects = memberships.filter(m => m.projectId).map(m => ({
        ...m.projectId._doc,
        role: m.role
    }));
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('ownerId', 'name');
    if (!project) return res.status(404).json({ error: 'Project not found' });
    const membership = await ProjectMember.findOne({ projectId: project._id, userId: req.user.id });
    res.json({ project, role: membership?.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProjectMembers = async (req, res) => {
    try {
        const members = await ProjectMember.find({ projectId: req.params.id }).populate('userId', 'name email');
        res.json(members);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.addRemarks = async (req, res) => {
    try {
      const membership = await ProjectMember.findOne({ userId: req.user.id, projectId: req.params.id });
      if (!membership || membership.role !== 'guide') {
          return res.status(403).json({ error: 'Only Guides can add remarks' });
      }
      const { remarks } = req.body;
      const project = await Project.findByIdAndUpdate(req.params.id, { remarks }, { new: true });
      res.json(project);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};
