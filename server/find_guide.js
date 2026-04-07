const mongoose = require('mongoose');
const ProjectMember = require('./src/models/ProjectMember');
require('dotenv').config();

async function checkProjectMembers() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const projectId = '69d531de16a6a89ad5c60da8';
        const members = await ProjectMember.find({ projectId }).populate('userId', 'name email');
        console.log(`Members for Project ${projectId}:`, JSON.stringify(members, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}
checkProjectMembers();
