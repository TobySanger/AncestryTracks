// w1888481 Toby Sanger
import mongoose from "mongoose";

const treeMemberSchema = new mongoose.Schema({
    treeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Familytree", 
        required: true 
    },
    fullName: { 
        type: String, 
        required: true,
        index: true 
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: false
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
    photo: { 
        type: String 
    },
    relations: {
        type: new mongoose.Schema({
          parents: { type: [mongoose.Schema.Types.ObjectId], ref: "TreeMember", default: [] },
          spouses: { type: [mongoose.Schema.Types.ObjectId], ref: "TreeMember", default: [] },
          children: { type: [mongoose.Schema.Types.ObjectId], ref: "TreeMember", default: [] },
        }, { _id: false }),
        default: {}
      }
      
      
    
}, { timestamps: true });

const TreeMember = mongoose.model("TreeMember", treeMemberSchema);
export default TreeMember;

