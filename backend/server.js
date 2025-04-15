import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import FamilytreeRoutes from './routes/familytree.route.js';
import TreeMemberRoutes from './routes/treemember.route.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;


// Middleware
app.use(express.json()); // Allows us to accept JSON data in the req.body

app.use("/api/familytrees", FamilytreeRoutes);
app.use("/api/treemembers", TreeMemberRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server started on http://localhost:" + PORT);
});

