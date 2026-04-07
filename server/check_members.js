const mongoose = require('mongoose');
const ProjectMember = require('./src/models/ProjectMember');
require('dotenv').config();

async function checkMembers() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const members = await ProjectMember.find({});
        console.log('Project Members:', JSON.stringify(members, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        await mongoose.disconnect();
    }
}
checkMembers();
