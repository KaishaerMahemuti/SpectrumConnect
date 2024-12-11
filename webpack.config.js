// Importing the `path` module, which is a built-in Node.js module for working with file paths
const path = require('path');

// Exporting the Webpack configuration object
module.exports = {
    // The entry point of the application, where Webpack starts bundling
    entry: './src/index.js',

    // The output configuration for the bundled files
    output: {
        // The directory where the bundled files will be saved
        path: path.resolve(__dirname, 'dist'), // Resolves to the 'dist' folder in the current directory

        // The name of the output bundle file
        filename: 'bundle.js',

        // The public URL of the output directory when referenced in the browser
        publicPath: '/',
    },

    // Configuration for handling different types of modules/files
    module: {
        rules: [
            {
                // A regular expression to match all `.js` files
                test: /\.js$/,

                // Exclude files in the `node_modules` directory from being processed
                exclude: /node_modules/,

                // Specifies the loader to use for these files
                use: {
                    loader: 'babel-loader', // Transforms ES6+ and JSX into compatible JavaScript

                    // Options for the Babel loader
                    options: {
                        // Presets to use for Babel
                        presets: [
                            '@babel/preset-env', // Transforms modern JavaScript into compatible versions
                            '@babel/preset-react', // Transforms JSX into JavaScript
                        ],
                    },
                },
            },
            {
                // A regular expression to match all `.css` files
                test: /\.css$/,

                // Specifies the loaders to use for CSS files
                use: [
                    'style-loader', // Injects CSS into the DOM as <style> tags
                    'css-loader',   // Resolves CSS imports and processes CSS files
                ],
            },
        ],
    },

    // Configuration for the Webpack development server
    devServer: {
        // Directory from which to serve static files
        static: path.resolve(__dirname, 'public'), // Resolves to the 'public' folder in the current directory

        // The port on which the development server will run
        port: 3000,

        // Automatically opens the browser when the server starts
        open: true,
    },
};
