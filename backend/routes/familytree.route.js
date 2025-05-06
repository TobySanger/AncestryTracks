// Author : Toby Sanger 
// Date : 06/05/2025 dd/mm/yyyy

// Description :
// This file defines the routes for the family tree API.
// It includes routes for creating, updating, deleting, and retrieving family trees. 
// It connects specific HTTP endpoints to their corresponding controller functions,
// enabling CRUD operations via RESTful API routes.

import express from 'express';
import { createfamilytree, deleteFamilytree, 
    getFamilytrees, updateFamilytree } from '../controllers/familytree.controller.js'; // Controller functions for handling family tree requests

const router = express.Router(); // New router instance for Express

router.get('/', getFamilytrees);
router.post('/', createfamilytree);
router.put("/:id", updateFamilytree);
router.delete("/:id", deleteFamilytree);

export default router; // Export to use in main server file

