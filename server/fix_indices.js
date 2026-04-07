const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/management_app';

async function fixIndices() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const db = mongoose.connection.db;
    const collection = db.collection('projects');
    
    console.log('Dropping old index: joinId_1...');
    try {
        await collection.dropIndex('joinId_1');
        console.log('Successfully dropped old joinId index.');
    } catch (e) {
        console.log('Index joinId_1 not found or already dropped.');
    }

    console.log('Dropping all other projects indices to avoid further conflicts...');
    await collection.dropIndexes();
    console.log('Successfully cleared all project indices. Mongoose will recreate new ones on restart.');

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error fixing indices:', err);
    process.exit(1);
  }
}

fixIndices();
