// Author : Toby Sanger 
// Date : 06/05/2025 dd/mm/yyyy
// Description : This file contains the controller functions for handling family member related requests.
// It includes functions to get all family members, create a new family member, update an existing family member, and delete a family member.
// The functions interact with the TreeMember model to perform CRUD operations on the family member data.


import mongoose from "mongoose"; // Importing Mongoose to interact with MongoDB
// Importing the TreeMember model - Defines the schema for family members
import TreeMember from "../models/treemember.model.js";

// Function to GET all family members of a specific tree
// Route: GET /api/treemembers/getMembers/:treeId
// This function fetches all family members associated with a specific family tree ID
// It populates the relations with parents, spouses, and children for each member
export const getTreeMembers = async (req, res) => {
    const { treeId } = req.params;
    try {
        const members = await TreeMember.find({ treeId })
            .populate("relations.parents")
            .populate("relations.spouses")
            .populate("relations.children");
        res.status(200).json({ success: true, data: members }); // Return the list of members
    } catch (error) {
        // Log any errors that occur during the fetch
        console.error("Error fetching family members:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Function to CREATE a new family member
// Route: POST /api/treemembers/createMember
// This function creates a new family member and saves it to the database
// It requires the treeId, fullName, and birthDate fields to be provided
// The function also accepts optional fields like deathDate, description, photo, and relations
// The relations field is an object that contains arrays for parents, spouses, and children
// The function validates the required fields and returns a 400 error if any are missing
// If the member is created successfully, it returns a 201 status with the new member data
// If there is an error during the creation process, it logs the error and returns a 500 status
// with a server error message
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

// Add a relationship (parent, child, or spouse) between two family members
// Route: POST /api/treemembers/addMemberRelations
// This function updates the relations of two family members based on the provided relation type
// It requires the memberId, relationType (parent, child, or spouse), and relatedMemberId fields to be provided
// The function validates the required fields and returns a 400 error if any are missing
// If the members are found, it updates both sides of the relation accordingly
// If the relation is added successfully, it returns a 200 status with the updated member data
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

// Function to UPDATE an existing family member
// Route: PUT /api/treemembers/updateMember/:id
// This function updates the details of a specific family member based on their ID
// It requires the ID of the member to be updated and the new data in the request body
// The function validates the ID and checks if the member exists
// If the member is found, it updates the member with the new data
// If the update is successful, it returns a 200 status with the updated member data
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

// Function to DELETE a family member
// Route: DELETE /api/treemembers/deleteMember/:id
// This function deletes a specific family member based on their ID
// It requires the ID of the member to be deleted
// The function validates the ID and checks if the member exists
// If the member is found, it deletes the member from the database
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
