import express from "express";
import { createTreeMember, getTreeMembers, updateTreeMember, deleteTreeMember } from "../controllers/treemember.controller.js";

const router = express.Router();

router.get("/:treeId", getTreeMembers);
router.post("/", createTreeMember);
router.put("/:id", updateTreeMember);
router.delete("/:id", deleteTreeMember);

export default router;
