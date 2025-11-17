const fs = require('fs');
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { connectToDb, getDb } = require('./db'); // Import database connection module
const { google } = require('googleapis');
const youtube = google.youtube('v3');
const API_KEY = process.env.YOUTUBE_API_KEY;
const PLAYLIST_ID = process.env.YOUTUBE_PLAYLIST_ID;

const cors = require('cors');
require('dotenv').config();

/**
 * getElderCareVideos function
 * Fetches elder care videos from YouTube.
 * @returns {array} - The list of elder care videos.
 * @throws {Error} - Throws an error if the request fails.
 */
async function getElderCareVideos() {
  try {
    const response = await youtube.playlistItems.list({
      part: 'snippet',
      playlistId: PLAYLIST_ID,
      maxResults: 10,
      key: API_KEY,
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching elder care videos:', error);
    throw error;
  }
}

/**
 * hospitalsByDepartment function
 * Fetches hospitals by department from the database.
 * @param {object} _ - The parent object (not used).
 * @param {object} args - The arguments object containing the department.
 * @returns {array} - The list of hospitals.
 * @throws {UserInputError} - Throws an error if the request fails.
 */
async function hospitalsByDepartment(_, { department }) {
  const db = getDb();
  console.log(`find hospital has "${department}" department`);
  try {
    const hospitals = await db.collection('hospital_en').find({
      departments_zh: { $regex: department, $options: 'i' } // Case-insensitive regex match
    }).toArray();
    console.log(`find ${hospitals.length} hospitals`);
    return hospitals;
  } catch (error) {
    console.error('error happens', error);
    throw new UserInputError('Error finding hospitals');
  }
}

/**
 * hospitalsByName function
 * Fetches hospitals by name from the database.
 * @param {object} _ - The parent object (not used).
 * @param {object} args - The arguments object containing the name.
 * @returns {array} - The list of hospitals.
 * @throws {UserInputError} - Throws an error if the request fails.
 */
async function hospitalsByName(_, { name }) {
  const db = getDb();
  try {
    const hospital = await db.collection('hospital_en').find({
      name: { $regex: name, $options: 'i' } // Case-insensitive regex match
    }).toArray();
    return hospital;
  } catch (error) {
    console.error('Error getting hospital:', error);
    throw new UserInputError('Error getting hospital');
  }
}

/**
 * getAllHospitals function
 * Fetches all hospitals from the database.
 * @returns {array} - The list of all hospitals.
 * @throws {UserInputError} - Throws an error if the request fails.
 */
async function getAllHospitals() {
  const db = getDb();
  try {
    const hospitals = await db.collection('hospital_en').find().toArray();
    return hospitals;
  } catch (error) {
    console.error('Error getting hospitals:', error);
    throw new UserInputError('Error getting hospitals');
  }
}

/**
 * blogs function
 * Fetches all blogs from the database.
 * @returns {array} - The list of all blogs.
 * @throws {ApolloError} - Throws an error if the request fails.
 */
async function blogs() {
  const db = getDb();
  try {
    const blogs_n = await db.collection('blogs').find().toArray();
    return blogs_n;
  } catch (error) {
    console.error('Error querying blogs:', error);
    throw new ApolloError('Failed to query blogs', 'BLOG_QUERY_FAILED');
  }
}

/**
 * createBlog function
 * Creates a new blog in the database.
 * @param {object} _ - The parent object (not used).
 * @param {object} args - The arguments object containing the blog input.
 * @returns {object} - The created blog.
 * @throws {ApolloError} - Throws an error if the request fails.
 */
async function createBlog(_, { input }) {
  const db = getDb();
  try {
    const result = await db.collection('blogs').insertOne(input);
    return { _id: result.insertedId, ...input };
  } catch (error) {
    console.error('Error creating blog:', error);
    throw new ApolloError('Failed to create blog', 'BLOG_CREATION_FAILED');
  }
}

/**
 * records function
 * Fetches all records from the database.
 * @returns {array} - The list of all records.
 * @throws {UserInputError} - Throws an error if the request fails.
 */
async function records() {
  const db = getDb();
  try {
    const records = await db.collection('records').find().toArray();
    return records;
  } catch (error) {
    console.error('Error getting records:', error);
    throw new UserInputError('Error getting records');
  }
}

/**
 * addRecords function
 * Adds multiple records to the database.
 * @param {object} _ - The parent object (not used).
 * @param {object} args - The arguments object containing the records input.
 * @returns {array} - The list of added records.
 * @throws {UserInputError} - Throws an error if the request fails.
 */
async function addRecords(_, { input }) {
  const db = getDb();
  try {
    const result = await db.collection('records').insertMany(input);
    return result.ops;
  } catch (error) {
    console.error('Error adding records:', error);
    throw new UserInputError('Error adding records');
  }
}

/**
 * addOneRecord function
 * Adds a single record to the database.
 * @param {object} _ - The parent object (not used).
 * @param {object} args - The arguments object containing the record input.
 * @returns {object} - The added record.
 * @throws {UserInputError} - Throws an error if the request fails.
 */
async function addOneRecord(_, { input }) {
  const db = getDb();
  try {
    const result = await db.collection('records').insertOne(input);
    return { _id: result.insertedId, ...input };
  } catch (error) {
    console.error('Error adding record:', error);
    throw new UserInputError('Error adding record');
  }
}

/**
 * deleteRecord function
 * Deletes a record from the database.
 * @param {object} _ - The parent object (not used).
 * @param {object} args - The arguments object containing the record ID.
 * @returns {boolean} - True if the record was deleted, false otherwise.
 * @throws {UserInputError} - Throws an error if the request fails.
 */
async function deleteRecord(_, { id }) {
  const db = getDb();
  try {
    if (!ObjectId.isValid(id)) {
      throw new UserInputError('Invalid ID format');
    }
    const result = await db.collection('records').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 1) {
      return true;
    } else {
      throw new UserInputError('Record not found');
    }
  } catch (error) {
    console.error('Error deleting record:', error);
    throw new UserInputError('Error deleting record');
  }
}

/**
 * searchRecords function
 * Searches records in the database by keyword.
 * @param {object} _ - The parent object (not used).
 * @param {object} args - The arguments object containing the search keyword.
 * @returns {array} - The list of matching records.
 * @throws {UserInputError} - Throws an error if the request fails.
 */
async function searchRecords(_, { keyword }) {
  const db = getDb();
  try {
    const regex = new RegExp(keyword, 'i'); // Case-insensitive regex match
    return await db.collection('records').find({
      $or: [
        { Disease: { $regex: regex } },
        { Symptoms: { $regex: regex } },
        { Medications: { $regex: regex } },
        { Duration: { $regex: regex } },
        { Hospital: { $regex: regex } },
        { Clinic: { $regex: regex } },
      ],
    }).toArray();
  } catch (error) {
    console.error('Error searching records:', error);
    throw new UserInputError('Error searching records');
  }
}

/**
 * searchBlogs function
 * Searches blogs in the database by keyword.
 * @param {object} _ - The parent object (not used).
 * @param {object} args - The arguments object containing the search keyword.
 * @returns {array} - The list of matching blogs.
 * @throws {UserInputError} - Throws an error if the request fails.
 */
async function searchBlogs(_, { keyword }) {
  const db = getDb();
  try {
    const regex = new RegExp(keyword, 'i'); // Case-insensitive regex match
    return await db.collection('blogs').find({
      $or: [
        { id: { $regex: regex } },
        { title: { $regex: regex } },
        { content: { $regex: regex } },
        { author: { $regex: regex } },
        { publication_date: { $regex: regex } },
        { tag: { $regex: regex } },
      ],
    }).toArray();
  } catch (error) {
    console.error('Error searching blogs:', error);
    throw new UserInputError('Error searching blogs');
  }
}

const resolvers = {
  Query: {
    hospitalsByDepartment,
    blogs,
    records,
    getAllHospitals,
    hospitalsByName,
    searchRecords,
    searchBlogs
  },
  Hospital: {
    address_zh: (parent) => parent.address_from_baidu_zh,
    address_en: (parent) => parent.address_from_baidu_en,
    phone: (parent) => parent.phone_number,
  },

  Mutation: {
    createBlog,
    addRecords,
    addOneRecord,
    deleteRecord
  },
};

const app = express();
const port = process.env.REACT_APP_PORT || 3000;

app.use(cors({
  origin: 'http://localhost:3000', // Allowed frontend origin
  credentials: true // Allow sending cookies
}));
app.use(express.json());
app.use(cookieParser());

// Add a new endpoint to get elder care videos
app.get('/api/elder-care-videos', async (req, res) => {
  try {
    const videos = await getElderCareVideos();
    res.json(videos);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

const apis = require('./apis');
app.use(bodyParser.json());
app.use(apis);

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
});

(async function () {
  try {
    await connectToDb();
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });
    app.listen(port, function () {
      console.log(`Server is running on http://localhost:${port}`);
      console.log(`GraphQL server is running on http://localhost:${port}/graphql`);
    });
  } catch (err) {
    console.log('ERROR when connecting:', err);
  }
})();