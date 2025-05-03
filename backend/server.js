import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import path from 'path';

import FamilytreeRoutes from './routes/familytree.route.js';
import TreeMemberRoutes from './routes/treemember.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

// Middleware
app.use(express.json()); 

app.use("/api/familytrees", FamilytreeRoutes);
app.use("/api/treemembers", TreeMemberRoutes);

// Check for environment 
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server started on http://localhost:" + PORT);
});

