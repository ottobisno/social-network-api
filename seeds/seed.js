const connection = require('../config/connection');
const { User, Thought } = require('../models');
const userData = require('./userData.json');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // Drop existing Users
    await User.deleteMany({});

    // Drop existing Thoughts
    await Thought.deleteMany({});

    // Populating the database with Users - Thoughts to be added manually in Insomnia
    await User.collection.insertMany(userData);

    // Logging the seed data in the console to see if the database was populated correctly
    console.table(userData);
    console.info('Seeding complete!');
    process.exit(0);
});