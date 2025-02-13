import mongoose from "mongoose";

const treeMemberSchema = new mongoose.Schema({
    treeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Familytree", 
        required: true 
    },
    fullName: { 
        type: String, 
        required: true 
    },
    birthDate: { 
        type: Date, 
        required: true 
    },
    deathDate: { 
        type: Date 
    },
    description: { 
        type: String 
    },
    photo: { 
        type: String 
    },
    relations: {
        father: { type: mongoose.Schema.Types.ObjectId, ref: "TreeMember" },
        mother: { type: mongoose.Schema.Types.ObjectId, ref: "TreeMember" },
        children: [{ type: mongoose.Schema.Types.ObjectId, ref: "TreeMember" }]

    }
}, { timestamps: true });

const TreeMember = mongoose.model("TreeMember", treeMemberSchema);
export default TreeMember;
