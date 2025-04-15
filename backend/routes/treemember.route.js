// W1888481 Toby Sanger
import express from "express";
import { createTreeMember, addMemberRelations, getTreeMembers, updateTreeMember, deleteTreeMember } from "../controllers/treemember.controller.js";

const router = express.Router();

router.get("/getMembers/:treeId", getTreeMembers);
//router.post("/addRelations/:memberId", addMemberRelations);
router.post("/addRelations", addMemberRelations);
router.post("/createMember", createTreeMember);
router.put("/:id", updateTreeMember);
router.delete("/deleteMember/:id", deleteTreeMember);

export default router;