import express from 'express';
import { createfamilytree, deleteFamilytree, getFamilytrees, updateFamilytree } from '../controllers/familytree.controller.js';

const router = express.Router();

router.get('/', getFamilytrees);
router.post('/', createfamilytree);
router.put("/:id", updateFamilytree);
router.delete("/:id", deleteFamilytree);


export default router;