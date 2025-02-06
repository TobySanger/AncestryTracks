import mongoose from 'mongoose';

const familytreeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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

const Familytree = mongoose.model('Familytree', familytreeSchema);

export default Familytree;