const Message = require('../models/Message');
const ProjectMember = require('../models/ProjectMember');

exports.sendMessage = async (req, res) => {
  try {
    const { projectId, text } = req.body;
    
    // Check if user is a member of the project
    const membership = await ProjectMember.findOne({ userId: req.user.id, projectId });
    if (!membership) return res.status(403).json({ error: 'Not a member of this project' });

    const message = new Message({
      project: projectId,
      sender: req.user.id, // Using sender instead of senderId/senderName for consistency if model updated
      text
    });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProjectMessages = async (req, res) => {
  try {
    const messages = await Message.find({ project: req.params.projectId })
      .populate('sender', 'name')
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
