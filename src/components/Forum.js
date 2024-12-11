import React, { useState, useEffect } from 'react'; // Import necessary hooks from React

const Forum = () => {
  // State to hold posts fetched from the backend
  const [posts, setPosts] = useState([]);

  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // State to manage form input data
  const [formData, setFormData] = useState({
    title: '', // Input for post title
    content: '', // Input for post content
    author: '', // Input for post author
  });

  // State to hold error messages
  const [error, setError] = useState(null);

  // useEffect hook to fetch posts from the backend when the component mounts
  useEffect(() => {
    console.log('Fetching posts from http://localhost:8080/api/forum'); // Debugging log
    fetch('http://localhost:8080/api/forum') // Fetch posts from the backend
      .then((response) => {
        console.log('Response status:', response.status); // Log response status
        return response.json(); // Parse response as JSON
      })
      .then((data) => {
        console.log('Fetched posts:', data); // Log fetched posts
        setPosts(data); // Update posts state with the fetched data
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        console.error('Error fetching posts:', error); // Log error
        setError('Failed to load posts'); // Set error state
      });
  }, []); // Empty dependency array ensures this runs only once

  // Function to handle form submission for creating a new post
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log('Submitting form:', formData); // Debugging log
    fetch('http://localhost:8080/api/forum', { // POST request to create a new post
      method: 'POST', // HTTP method
      headers: {
        'Content-Type': 'application/json', // Specify JSON content type
      },
      body: JSON.stringify(formData), // Send form data as JSON
    })
      .then((response) => {
        console.log('Response status:', response.status); // Log response status
        return response.json(); // Parse response as JSON
      })
      .then((newPost) => {
        console.log('Created post:', newPost); // Log the newly created post
        setPosts([...posts, newPost]); // Add the new post to the existing posts
        setFormData({ title: '', content: '', author: '' }); // Reset form inputs
      })
      .catch((error) => {
        console.error('Error creating post:', error); // Log error
        setError('Failed to create post'); // Set error state
      });
  };

  return (
    <div className="forum-container"> 
      <h2>Community Forum</h2> {/* Forum heading */}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if any */}
      <form onSubmit={handleSubmit}> {/* Form for creating a new post */}
        <input
          type="text" // Input type
          placeholder="Title" // Placeholder text
          value={formData.title} // Bind value to formData.title
          onChange={(e) => setFormData({ ...formData, title: e.target.value })} // Update title on change
          required // Make field required
        />
        <textarea
          placeholder="Content" // Placeholder text
          value={formData.content} // Bind value to formData.content
          onChange={(e) => setFormData({ ...formData, content: e.target.value })} // Update content on change
          required // Make field required
        />
        <input
          type="text" // Input type
          placeholder="Author" // Placeholder text
          value={formData.author} // Bind value to formData.author
          onChange={(e) => setFormData({ ...formData, author: e.target.value })} // Update author on change
          required // Make field required
        />
        <button type="submit">Create Post</button> {/* Submit button */}
      </form>
      {loading ? ( // Show loading message while posts are being fetched
        <p>Loading posts...</p>
      ) : (
        <ul> {/* Render list of posts */}
          {posts.map((post) => (
            <li key={post._id}> {/* Use post ID as key */}
              <h3>{post.title}</h3> {/* Display post title */}
              <p>{post.content}</p> {/* Display post content */}
              <small>By: {post.author}</small> {/* Display post author */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Forum; // Export the Forum component
