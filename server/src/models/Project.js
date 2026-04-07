const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  problemStatement: { type: String },
  technologies: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  teamMemberNames: { type: [String] },
  memberCount: { type: Number },
  guideName: { type: String },
  teamInviteId: { type: String, unique: true, required: true },
  guideInviteId: { type: String, unique: true, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
