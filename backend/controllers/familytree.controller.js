import mongoose from 'mongoose';
import Familytree from '../models/familytree.model.js';

export const getFamilytrees = async (req, res) => {
    try {
        const familytrees = await Familytree.find({});
        res.status(200).json({ success: true, data: familytrees });
    } catch (error) {
        console.log("Error in Fetching trees: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" }); // 500 is server error
    }
};

export const createfamilytree = async (req, res) => {
    const familytree = req.body; // User will send this data

    if(!familytree.name || !familytree.description || !familytree.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newFamilytree = new Familytree(familytree);

    try {
        await newFamilytree.save();
        res.status(201).json({ success: true, data: newFamilytree });
    } catch (error) {
        console.error("Error in Create tree: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" }); // 500 is server error
    }
}

export const updateFamilytree =  async (req, res) => {
    const { id } = req.params;

    const familytree = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Family Tree ID" });
    }

    try {
        const updatedFamilytree = await Familytree.findByIdAndUpdate(id, familytree, { new: true });
        res.status(200).json({ success: true, data: updatedFamilytree });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

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