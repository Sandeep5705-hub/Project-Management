const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String }, // Can be a URL or text
  plagiarismScore: { type: Number, default: 0 },
  relevanceScore: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['Pending Review', 'Needs Revision', 'Accepted'], 
    default: 'Pending Review' 
  },
  feedback: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);
