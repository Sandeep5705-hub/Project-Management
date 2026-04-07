const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  title: { type: String, required: true },
  description: { type: String },
  category: { 
    type: String, 
    required: true 
  },
  priority: { 
    type: String, 
    default: 'Medium' 
  },
  quizStatus: { 
    type: String, 
    default: 'Quiz Pending' 
  },
  deadline: { type: Date },
  status: { type: String, default: 'Pending' },
  createdByRole: { type: String, default: 'owner' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  submissions: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    githubLink: { type: String },
    fileName: { type: String },
    submittedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

// Robust Model Export: Prevents Mongoose from using a cached version of the schema
module.exports = mongoose.models.Task || mongoose.model('Task', taskSchema);
