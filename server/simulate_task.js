const mongoose = require('mongoose');
const Task = require('./src/models/Task');
const ProjectMember = require('./src/models/ProjectMember');
require('dotenv').config();

async function simulateRequest() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        const projectId = '69d531de16a6a89ad5c60da8';
        const userId = '67f41a87e50b18f02934b127'; // Assuming this is our login user

        console.log('Testing Project ID:', projectId);
        console.log('Testing User ID:', userId);

        const membership = await ProjectMember.findOne({ 
            userId: mongoose.Types.ObjectId(userId), 
            projectId: mongoose.Types.ObjectId(projectId) 
        });

        if (!membership) {
            console.error('CRITICAL: No membership found for this project. Guide is NOT joined.');
        } else {
            console.log('Membership found! Role:', membership.role);
            
            const task = new Task({
                project: projectId,
                title: 'PPt Submission',
                category: 'Research',
                description: 'test',
                createdByRole: membership.role,
                createdBy: userId
            });

            await task.save();
            console.log('Task saved successfully!');
        }
    } catch (err) {
        console.error('SIMULATION ERROR:', err.message);
    } finally {
        await mongoose.disconnect();
    }
}
simulateRequest();
