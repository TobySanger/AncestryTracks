// Author : Toby Sanger 
// Date : 06/05/2025 dd/mm/yyyy

// Description :
// This file defines the Mongoose schema and model for a Family Tree entity in MongoDB.
// It describes the structure and rules for each family tree document stored in the database.
// Each tree includes a name, a description, and an image URL, and is automatically timestamped upon creation and update.


import mongoose from 'mongoose'; // Import mongoose to define the schema and interact with MongoDB

// Define the schema for the Familytree collection
const familytreeSchema = new mongoose.Schema({
    // Define the fields for the family tree
    name: {
        type: String, // Must be a string
        required: true // Must be provided
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
}, {
    timestamps: true  // createdAt and updatedAt
});

// Create a Mongoose model from the schema
// This allows us to interact with the familytrees collections in MongoDB
const Familytree = mongoose.model('Familytree', familytreeSchema);

// Export the model so it can be used in controllers. 
export default Familytree;