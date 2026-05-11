const mongoose = require('mongoose');

const projectMemberSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  role: { type: String, enum: ['owner', 'member', 'guide'], required: true }
}, { timestamps: true });

// Create compound index to ensure unique membership
projectMemberSchema.index({ userId: 1, projectId: 1 }, { unique: true });

module.exports = mongoose.model('ProjectMember', projectMemberSchema);
