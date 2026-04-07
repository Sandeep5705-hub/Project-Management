const mongoose = require('mongoose');
const Task = require('./src/models/Task');
const Project = require('./src/models/Project');
require('dotenv').config();

async function seedProject() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB for seeding...');

    const projectId = '69d531de16a6a89ad5c60da8'; // From your screenshot
    const sandeepId = '67f41a87e50b18f02934b127'; // Assuming this is your userId

    // CLEAR OLD TASKS
    await Task.deleteMany({ project: projectId });

    const tasks = [
      {
        project: projectId,
        title: 'Uploading Files',
        category: 'Research',
        priority: 'Medium',
        quizStatus: 'Quiz Taken',
        description: 'Upload research papers, links, and reference materials.',
        deadline: new Date('2026-05-01'),
        createdBy: sandeepId,
        submissions: [{ fileName: 'Market_Research_Introduction.pdf', submittedAt: new Date('2026-05-01') }]
      },
      {
        project: projectId,
        title: 'User Interviews',
        category: 'Research',
        priority: 'High',
        description: 'Upload interviews, transcripts or other research notes.',
        deadline: new Date('2026-05-05'),
        createdBy: sandeepId
      },
      {
        project: projectId,
        title: 'PPT Submission',
        category: 'Design',
        priority: 'Low',
        description: 'Conceptual presentation of the system.',
        deadline: new Date('2026-05-10'),
        createdBy: sandeepId
      },
      {
        project: projectId,
        title: 'Code Submission',
        category: 'Development',
        priority: 'High',
        description: 'Initial implementation and module uploads.',
        deadline: new Date('2026-05-16'),
        createdBy: sandeepId
      },
      {
        project: projectId,
        title: 'Testing & Results',
        category: 'Testing',
        priority: 'Medium',
        description: 'Upload unit test results and documentation.',
        deadline: new Date('2026-05-20'),
        createdBy: sandeepId
      },
      {
        project: projectId,
        title: 'Final Documentation',
        category: 'Documentation',
        priority: 'High',
        description: 'Complete project report and final summary.',
        deadline: new Date('2026-05-25'),
        createdBy: sandeepId
      }
    ];

    await Task.insertMany(tasks);
    console.log('--- 100% SPEC SYNC: 6 MODULES INFUSED! ---');
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

seedProject();
