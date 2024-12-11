// Entry point for the React application

// Importing the React library, which is essential for building components
import React from 'react';

// Importing ReactDOM for rendering React components to the DOM
import ReactDOM from 'react-dom/client';

// Importing the main App component, which serves as the root of the React application
import App from './components/App';

// Importing the global CSS file to apply styles across the application
import './styles/main.css';

// Creating a root DOM node where the React application will be rendered
// ReactDOM.createRoot is used for React 18 and later
const root = ReactDOM.createRoot(document.getElementById('root')); // 'root' is the ID of the div in public/index.html

// Rendering the App component inside the root DOM node
// React.StrictMode is a development tool that helps identify potential problems in the application
root.render(
    <React.StrictMode>
        <App /> {/* Rendering the main App component */}
    </React.StrictMode>
);
