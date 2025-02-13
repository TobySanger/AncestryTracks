import mongoose from "mongoose";
import TreeMember from "../models/treemember.model.js";

// 🔹 Get all family members for a tree
export const getTreeMembers = async (req, res) => {
    const { treeId } = req.params;
    try {
        const members = await TreeMember.find({ treeId })
            .populate("relations.father")
            .populate("relations.mother")
            .populate("relations.children");
        res.status(200).json({ success: true, data: members });
    } catch (error) {
        console.error("Error fetching family members:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// 🔹 Create a new family member
export const createTreeMember = async (req, res) => {
    const { treeId, fullName, birthDate, deathDate, description, photo, relations } = req.body;

    if (!treeId || !fullName || !birthDate) {
        return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    try {
        const newMember = new TreeMember({ treeId, fullName, birthDate, deathDate, description, photo, relations });

        // Save new member
        await newMember.save();

        // Update existing family members' relations dynamically
        if (relations) {
            if (relations.father) await TreeMember.findByIdAndUpdate(relations.father, { $push: { children: newMember._id } });
            if (relations.mother) await TreeMember.findByIdAndUpdate(relations.mother, { $push: { children: newMember._id } });
            if (relations.children) {
                for (let child of relations.children) {
                    await TreeMember.findByIdAndUpdate(child, { $set: { father: newMember._id } }); // Assuming father, can adjust for mother
                }
            }
           
        }

        res.status(201).json({ success: true, data: newMember });
    } catch (error) {
        console.error("Error creating family member:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


// 🔹 Update a family member
export const updateTreeMember = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Member ID" });
    }

    try {
        const updatedMember = await TreeMember.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json({ success: true, data: updatedMember });
    } catch (error) {
        console.error("Error updating family member:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// 🔹 Delete a family member
export const deleteTreeMember = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Member ID" });
    }

    try {
        await TreeMember.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Family member deleted successfully." });
    } catch (error) {
        console.error("Error deleting family member:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
