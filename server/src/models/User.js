const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'guide'], default: 'user' },
  // Stats for the leaderboard
  score: { type: Number, default: 0 },
  quizzesCompleted: { type: Number, default: 0 },
  avgQuizScore: { type: Number, default: 0 },
  commits: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  improvement: { type: Number, default: 0 }, // Percentage
  quizProgress: {
    q1: { completed: { type: Boolean, default: false }, score: { type: Number, default: 0 }, accuracy: { type: Number, default: 0 }, speed: { type: Number, default: 0 } },
    q2: { completed: { type: Boolean, default: false }, score: { type: Number, default: 0 }, accuracy: { type: Number, default: 0 }, speed: { type: Number, default: 0 } },
    q3: { completed: { type: Boolean, default: false }, score: { type: Number, default: 0 }, accuracy: { type: Number, default: 0 }, speed: { type: Number, default: 0 } }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
