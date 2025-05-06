// Author : Toby Sanger 
// Date : 06/05/2025 dd/mm/yyyy

// Description:
// This is the entry point of the backend application.
// It initialises the Express server, connects to MongoDB, sets up API routes,
// handles middleware, and configures production deployment behavior.

import express from 'express'; // Create server and manage routes
import dotenv from 'dotenv'; // Loads environment variables from .env file
import { connectDB } from './config/db.js'; // Connect to MongoDB
import path from 'path'; // Node.js module to work with file and directory paths

// Import routes for family trees and tree members
import FamilytreeRoutes from './routes/familytree.route.js';
import TreeMemberRoutes from './routes/treemember.route.js';

dotenv.config(); // Load environment variables from .env file

const app = express(); // Initialise Express application
const PORT = process.env.PORT || 3000; // Set the port for the server

const __dirname = path.resolve(); // Get absolute path from the project root


// Middleware
// Emables the server to parse JSON data in requests
app.use(express.json()); 

app.use("/api/familytrees", FamilytreeRoutes);
app.use("/api/treemembers", TreeMemberRoutes);

// ----------------------------------------
// Production Environment
// ----------------------------------------

// If the app is running in production mode, serve the static frontend assets from the 'dist' folder
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

// Begin listening for incoming requests 
app.listen(PORT, () => {
    connectDB(); 
    console.log("Server started on http://localhost:" + PORT); 
});

