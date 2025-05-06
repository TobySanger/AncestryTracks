// Author : Toby Sanger 
// Date : 06/05/2025 dd/mm/yyyy

// Description :
// This file defines the Mongoose schema and model for individual members in a family tree.
// It captures personal information like name, birth and death dates, biography, and relationships.
// This schema is referenced in various CRUD operations and tree visualizations throughout the project.


import mongoose from "mongoose";

// Define the schema for a single tree member
const treeMemberSchema = new mongoose.Schema({
    // Reference to the tree this member belongs to
    treeId: { 
        type: mongoose.Schema.Types.ObjectId, // Stores the ID of the family tree
        ref: "Familytree", 
        required: true // Must be provided
    },
    fullName: { 
        type: String, 
        required: true,
        index: true // Index for faster searches by name
    },
    birthDate: { 
        type: Date, 
        index: true
    },
    deathDate: { 
        type: Date 
    },
    description: { 
        type: String 
    },
    // Optional URL for a photo of the member
    photo: { 
        type: String 
    },
    // Nested schema for managing relationships with other members
    relations: {
        type: new mongoose.Schema({
          parents: { type: [mongoose.Schema.Types.ObjectId], ref: "TreeMember", default: [] }, // Array of parent IDs
          spouses: { type: [mongoose.Schema.Types.ObjectId], ref: "TreeMember", default: [] }, // Array of spouse IDs
          children: { type: [mongoose.Schema.Types.ObjectId], ref: "TreeMember", default: [] }, // Array of child IDs
        }, { _id: false }), // Prevent Mongoose from adding an unnecessary _id to the nested 'relations' object,
        // since 'relations' is not a standalone subdocument and doesn't need its own unique identifier
        default: {}
      }
      
      
    
}, { timestamps: true }); // createdAt and updatedAt

const TreeMember = mongoose.model("TreeMember", treeMemberSchema);

// Export the model for use in controller.
export default TreeMember;

