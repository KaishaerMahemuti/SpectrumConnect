// Importing the Express library, which provides tools for building web servers and APIs
const express = require('express');

// Creating a new router instance using Express
// This router will define and manage API routes for the forum functionality
const router = express.Router();

// Importing the ForumPost model to interact with the MongoDB collection for forum posts
const ForumPost = require('../models/ForumPost');

// Route to handle fetching all forum posts
// GET request to /api/forum
router.get('/forum', async (req, res) => {
  try {
    // Fetching all documents (forum posts) from the ForumPost collection
    const posts = await ForumPost.find();

    // Sending the fetched posts as a JSON response to the client
    res.json(posts);
  } catch (error) {
    // Sending a 500 (Internal Server Error) status code if something goes wrong
    res.status(500).json({ message: 'Error fetching posts', error });
  }
});

// Route to handle creating a new forum post
// POST request to /api/forum
router.post('/forum', async (req, res) => {
  try {
    // Destructuring the title, content, and author fields from the request body
    const { title, content, author } = req.body;

    // Creating a new instance of ForumPost with the received data
    const newPost = new ForumPost({ title, content, author });

    // Saving the new post to the MongoDB collection
    await newPost.save();

    // Sending the newly created post as a JSON response to the client with a 201 (Created) status
    res.status(201).json(newPost);
  } catch (error) {
    // Sending a 400 (Bad Request) status code if there is an error in the request
    res.status(400).json({ message: 'Error creating post', error });
  }
});

// Exporting the router so it can be used in other parts of the application
// Specifically, it will be imported and used in the main server file
module.exports = router;
