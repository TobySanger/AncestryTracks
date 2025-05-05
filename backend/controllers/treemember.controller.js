import mongoose from "mongoose";
import TreeMember from "../models/treemember.model.js";

export const getTreeMembers = async (req, res) => {
    const { treeId } = req.params;
    try {
        const members = await TreeMember.find({ treeId })
            .populate("relations.parents")
            .populate("relations.spouses")
            .populate("relations.children");
        res.status(200).json({ success: true, data: members });
    } catch (error) {
        console.error("Error fetching family members:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createTreeMember = async (req, res) => {
    const { treeId, fullName, birthDate, deathDate, description, photo, relations } = req.body;

    if (!treeId || !fullName || !birthDate) {
        return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    try {
        const newMember = new TreeMember({ treeId, fullName, birthDate, deathDate, description, photo, relations });
        await newMember.save();
        res.status(201).json({ success: true, data: newMember });
    } catch (error) {
        console.error("Error creating family member:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const addMemberRelations = async (req, res) => {
    const { memberId, relationType, relatedMemberId } = req.body;

    if (!memberId || !relationType || !relatedMemberId) {
        return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    try {
        const member = await TreeMember.findById(memberId);
        const relatedMember = await TreeMember.findById(relatedMemberId);

        if (!member || !relatedMember) {
            return res.status(404).send('Member not found');
        }

        // Update both sides of the relation
        if (relationType === 'parent') {
            member.relations.parents.push(relatedMemberId);
            relatedMember.relations.children.push(memberId); 
        } else if (relationType === 'child') {
            member.relations.children.push(relatedMemberId);
            relatedMember.relations.parents.push(memberId);
        } else if (relationType === 'spouse') {
            member.relations.spouses.push(relatedMemberId);
            relatedMember.relations.spouses.push(memberId); 
        } else {
            return res.status(400).send('Invalid relation type');
        }

        await member.save();
        await relatedMember.save();

        res.status(200).json({ success: true, data: member });
    } catch (error) {
        res.status(400).send(error.message);
    }
};


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
