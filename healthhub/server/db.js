const { MongoClient } = require('mongodb');
require('dotenv').config();

let db;

/**
 * connectToDb function
 * Connects to the MongoDB database using the provided connection string.
 * @throws {Error} - Throws an error if the connection fails.
 */
async function connectToDb() {
  try {
    const url = 'mongodb+srv://2315902845:6gK61uB8xsMvhYpq@cluster0.5b8hk.mongodb.net/Healthhub';
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB at', url);
    db = client.db();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to database');
  }
}

/**
 * getDb function
 * Returns the connected MongoDB database instance.
 * @returns {object} - The MongoDB database instance.
 * @throws {Error} - Throws an error if the database is not connected.
 */
function getDb() {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
}

module.exports = { connectToDb, getDb };