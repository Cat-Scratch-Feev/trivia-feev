const db = require('../config/connection');
const { User } = require('../models');
const userSeeds = require('./userSeeds.json');

db.once('open', async () => {
    try {
        // Await db.dropDatabase();
        await User.deleteMany({});
        // Create new users
        await User.create(userSeeds);
        console.log('Seeding complete.');
    } catch (err) {
        console.error('Seeding error:', err);
    } finally {
        db.close();
    }
});