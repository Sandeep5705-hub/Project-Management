const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../src/models/User');
const Project = require('../src/models/Project');
const Task = require('../src/models/Task');
const Submission = require('../src/models/Submission');
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/management_app';

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Clearing old data...');
    await User.deleteMany({});
    await Project.deleteMany({});
    await Task.deleteMany({});
    await Submission.deleteMany({});

    const hashedPassword = await bcrypt.hash('password123', 10);

    console.log('Creating users...');
    const users = await User.insertMany([
      { name: 'Sarah Chen', email: 'sarah@example.com', password: hashedPassword, role: 'user', score: 950, quizzesCompleted: 11, avgQuizScore: 92, commits: 138, reviews: 24, improvement: 27 },
      { name: 'Michael Kim', email: 'michael@example.com', password: hashedPassword, role: 'user', score: 920, quizzesCompleted: 10, avgQuizScore: 88, commits: 112, reviews: 18, improvement: 15 },
      { name: 'Emily Rodriguez', email: 'emily@example.com', password: hashedPassword, role: 'user', score: 895, quizzesCompleted: 9, avgQuizScore: 85, commits: 95, reviews: 12, improvement: 10 },
      { name: 'David Park', email: 'david@example.com', password: hashedPassword, role: 'user', score: 870, quizzesCompleted: 8, avgQuizScore: 82, commits: 88, reviews: 8, improvement: 5 },
      { name: 'Jessica Lee', email: 'jessica@example.com', password: hashedPassword, role: 'user', score: 845, quizzesCompleted: 7, avgQuizScore: 80, commits: 75, reviews: 5, improvement: 2 },
      { name: 'Dr. Aris', email: 'guide@example.com', password: hashedPassword, role: 'guide' }
    ]);

    const guide = users.find(u => u.role === 'guide');
    const lead = users[0];

    console.log('Creating projects...');
    const projects = await Project.insertMany([
      { title: 'E-Commerce Platform', category: 'WebApp', description: 'Building a modern online shopping platform', progress: 75, joinId: 'ECOMM-1', owner: lead._id, members: users.map(u => u._id) },
      { title: 'Mobile Banking App', category: 'FinTech', description: 'Secure banking solution for iOS and Android', progress: 45, joinId: 'BANK-2', owner: users[1]._id, members: [users[1]._id, users[2]._id, guide._id] },
      { title: 'AI Chat Assistant', category: 'AI/ML', description: 'NLP-powered customer support chatbot', progress: 60, joinId: 'AICHAT-3', owner: users[2]._id, members: [users[2]._id, users[0]._id, guide._id] },
      { title: 'Healthcare Dashboard', category: 'Health', description: 'Patient management and analytics system', progress: 90, joinId: 'HEALTH-4', owner: guide._id, members: users.map(u => u._id) },
      { title: 'Social Media Analytics', category: 'Data', description: 'Track engagement and growth metrics', progress: 30, joinId: 'SOCIAL-5', owner: users[3]._id, members: [users[3]._id, users[4]._id] },
      { title: 'Learning Management System', category: 'Education', description: 'Online education platform with live classes', progress: 55, joinId: 'LMS-6', owner: users[4]._id, members: [users[4]._id, users[0]._id] }
    ]);

    console.log('Creating tasks...');
    for (const project of projects) {
      await Task.insertMany([
        { project: project._id, title: 'Market Analysis', stage: 'Research', difficulty: 'Medium', quizStatus: 'Quiz Passed', status: 'Completed', createdBy: lead._id },
        { project: project._id, title: 'User Interviews', stage: 'Research', difficulty: 'High', quizStatus: 'Quiz Pending', status: 'Pending', createdBy: lead._id },
        { project: project._id, title: 'Wireframes', stage: 'Design', difficulty: 'Low', quizStatus: 'Quiz Passed', status: 'Completed', createdBy: lead._id },
        { project: project._id, title: 'API Integration', stage: 'Development', difficulty: 'High', quizStatus: 'Quiz Pending', status: 'Pending', createdBy: guide._id },
        { project: project._id, title: 'Frontend Components', stage: 'Development', difficulty: 'Medium', quizStatus: 'Quiz Taken', status: 'Pending', createdBy: lead._id },
        { project: project._id, title: 'Unit Tests', stage: 'Testing', difficulty: 'Medium', quizStatus: 'Quiz Pending', status: 'Pending', createdBy: lead._id }
      ]);
    }

    console.log('Creating submissions...');
    await Submission.create({
      project: projects[0]._id,
      submittedBy: lead._id,
      title: 'Market Research Report',
      content: 'Summary of the e-commerce landscape...',
      plagiarismScore: 5,
      relevanceScore: 92,
      status: 'Pending Review'
    });

    console.log('Database seeded successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
