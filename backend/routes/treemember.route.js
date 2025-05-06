// Author : Toby Sanger 
// Date : 06/05/2025 dd/mm/yyyy

// Description:
// This file defines the Express routes for handling operations related to individual family tree members.
// It maps specific HTTP endpoints to their respective controller functions,
// allowing the frontend to interact with the backend using RESTful API routes.

import express from "express";
import { createTreeMember, addMemberRelations, getTreeMembers, 
    updateTreeMember, deleteTreeMember } from "../controllers/treemember.controller.js"; // Importing controller functions for handling family member requests

const router = express.Router(); // New router instance for Express

router.get("/getMembers/:treeId", getTreeMembers);
router.post("/addRelations", addMemberRelations);
router.post("/createMember", createTreeMember);
router.put("/updateMember/:id", updateTreeMember);
router.delete("/deleteMember/:id", deleteTreeMember);

export default router; // Export to use in main server file