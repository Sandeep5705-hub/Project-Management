const mongoose = require('mongoose');
const Task = require('./src/models/Task');
const ProjectMember = require('./src/models/ProjectMember');
require('dotenv').config();

async function debugTaskCreation() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        const projectId = '69d531de16a6a89ad5c60da8';
        const userId = '67f41a87e50b18f02934b127'; // Dummy or real user ID from your session

        const membership = await ProjectMember.findOne({ userId, projectId });
        console.log('Membership:', membership);

        const task = new Task({
            project: projectId,
            title: 'Test Task',
            category: 'Research',
            description: 'Test Description',
            createdByRole: 'guide',
            createdBy: userId
        });

        await task.save();
        console.log('Task saved successfully');
    } catch (err) {
        console.error('Error adding task:', err.message);
    } finally {
        await mongoose.disconnect();
    }
}

debugTaskCreation();
