const mongoose = require('mongoose');
require('dotenv').config();

// We need to define or import the schema to avoid 'MissingSchemaError'
const TaskSchema = new mongoose.Schema({
  project: mongoose.Schema.Types.ObjectId,
  title: String,
  category: String,
  description: String,
  priority: String,
  quizStatus: String,
  deadline: Date,
  status: { type: String, default: 'Pending' },
  createdBy: mongoose.Schema.Types.ObjectId,
  submissions: Array
});

const ProjectSchema = new mongoose.Schema({
  title: String,
  ownerId: mongoose.Schema.Types.ObjectId
});

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);
const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

async function findAndSeed(title) {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Searching for project: "${title}"...`);

    const project = await Project.findOne({ title });
    if (!project) {
      console.log('Project not found!');
      return;
    }

    const projectId = project._id;
    console.log(`Found project ID: ${projectId}. Clearing old tasks...`);

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
        status: 'Completed',
        submissions: [{ fileName: 'Market_Research_Introduction.pdf', submittedAt: new Date('2026-05-01') }]
      },
      {
        project: projectId,
        title: 'User Interviews',
        category: 'Research',
        priority: 'High',
        description: 'Upload interviews, transcripts or other research notes.',
        deadline: new Date('2026-05-05')
      },
      {
        project: projectId,
        title: 'PPT Submission',
        category: 'Design',
        priority: 'Low',
        description: 'Conceptual presentation of the system.',
        deadline: new Date('2026-05-10')
      },
      {
        project: projectId,
        title: 'Code Submission',
        category: 'Development',
        priority: 'High',
        description: 'Initial implementation and module uploads.',
        deadline: new Date('2026-05-16')
      },
      {
        project: projectId,
        title: 'Testing & Results',
        category: 'Testing',
        priority: 'Medium',
        description: 'Upload unit test results and documentation.',
        deadline: new Date('2026-05-20')
      },
      {
        project: projectId,
        title: 'Final Documentation',
        category: 'Documentation',
        priority: 'High',
        description: 'Complete project report and final summary.',
        deadline: new Date('2026-05-25')
      }
    ];

    await Task.insertMany(tasks);
    console.log('--- SEEDING COMPLETE FOR: ' + title + ' ---');
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
  }
}

// Get title from command line or default to "Smart Education"
const targetTitle = process.argv[2] || 'Smart Education';
findAndSeed(targetTitle);
