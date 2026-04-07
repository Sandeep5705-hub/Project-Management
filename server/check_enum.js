const mongoose = require('mongoose');
const Task = require('./src/models/Task');
require('dotenv').config();

async function checkEnum() {
    try {
        console.log('Mongoose version:', mongoose.version);
        console.log('Task Enum Values:', Task.schema.path('createdByRole').enumValues);
        
        // Try to manually validate a task object
        const t = new Task({
            project: new mongoose.Types.ObjectId(),
            title: 'Test',
            category: 'Research',
            createdByRole: 'guide'
        });
        
        const err = t.validateSync();
        if (err) {
            console.log('Validation Error detected:', err.message);
        } else {
            console.log('Validation passed for "guide"');
        }
    } catch (err) {
        console.error(err);
    }
}
checkEnum();
