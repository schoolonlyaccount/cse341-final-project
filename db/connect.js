// MongoDB connection setup and database instance management
const MongoClient = require('mongodb').MongoClient;

// Database instance holder
let database;

// Initialize the database connection
const initDb = (callback) => {
    if (database) {
        console.log('Db is already initialized!');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            database = client;
            callback(null, database);
        })
        .catch((err) => {
            callback(err);
        });
};

// Get the initialized database instance
const getDatabase = () => {
    if (!database) {
        throw Error('Database not initialized!');
    }
    return database;
};

// Export the database functions
module.exports = {
    initDb,
    getDatabase
};