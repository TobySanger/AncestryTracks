// Author : Toby Sanger 
// Date : 06/05/2025 dd/mm/yyyy
// Some elements of this code are based on the MERN stack tutorial by freeCodeCamp.org on YouTube.

// Description : 
// This file contains the controller functions for handling family tree related requests.
// It includes functions to get all family trees, create a new family tree, update an existing family tree, 
// and delete a family tree.
// The functions interact with the Familytree model to perform CRUD operations on the family tree data.

import mongoose from 'mongoose'; // Importing Mongoose to interact with MongoDB
import Familytree from '../models/familytree.model.js'; // Importing the Familytree model - Defines the schema for family trees

// Function to GET all family trees from the database
// Route: GET /api/familytrees
export const getFamilytrees = async (req, res) => {
    try {
        // USe Mongoose to fecth all family trees from the collections
        const familytrees = await Familytree.find({});
        // Return the list of trees with 200 OK status
        res.status(200).json({ success: true, data: familytrees });
    } catch (error) {
        // Log any errors that occur during the fetch
        console.log("Error in Fetching trees: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" }); // Send 500 is server error
    }
};

// Function to CREATE a new family tree
// Route: POST /api/familytrees
export const createfamilytree = async (req, res) => {
    const familytree = req.body; // Extract the new tree data from the request body that the user sent
    // Check if all required fields are provided

    if(!familytree.name || !familytree.description || !familytree.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" }); // 400 is bad request if field is missing
    }

    const newFamilytree = new Familytree(familytree); // Create a new instance of the Familytree model with the provided data

    try {
        // Save the new family tree to the database
        await newFamilytree.save();
        // Return the created family tree with 201 Created status
        res.status(201).json({ success: true, data: newFamilytree });
    } catch (error) {
        // Log any errors that occur during the save
        console.error("Error in Create tree: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" }); 
    }
}

// Function to UPDATE an existing family tree
// Route: PUT /api/familytrees/:id
export const updateFamilytree =  async (req, res) => {
    const { id } = req.params; // Extract the family tree ID from the request parameters

    const familytree = req.body; // Extract the updated family tree data from the request body

    // Check if the provided ID is a valid MongoDB ObjectId
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Family Tree ID" });
    }

    try {
        // Find the family tree by ID and update it with the new data
        // The { new: true } option returns the updated document
        const updatedFamilytree = await Familytree.findByIdAndUpdate(id, familytree, { new: true });
        res.status(200).json({ success: true, data: updatedFamilytree }); // Sned back the updated family tree with 200 OK status
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

// Function to DELETE a family tree
// Route: DELETE /api/familytrees/:id
// This function deletes a family tree by its ID
// It first checks if the ID is valid, then attempts to find and delete the tree from the database
// If successful, it returns a success message; otherwise, it logs the error and returns a server error response
export const deleteFamilytree =  async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Tree Id" });
	}

    try {
        await Familytree.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Family Tree deleted" });
    } catch (error) {
        console.log("Error in Delete tree: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}