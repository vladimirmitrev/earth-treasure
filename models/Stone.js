const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [2, 'Name is shorter than 2 characters']
    },
    category: {
        type: String,
        required: [true, 'Category is required!'],
        minLength: [3, 'Category is shorter than 3 characters']
    },
    color: {
        type: String,
        required: [true, 'Color is required!'],
        minLength: [2, 'Color is shorter than 2 characters']
    },
    formula: {
        type: String,
        required: [true, 'Formula is required!'],
        minLength: [3, 'Formula is shorter than 3 characters'],
        maxLength: [30, 'Formula is longer than 30 characters'],
       
    },
    location: {
        type: String,
        required: [true, 'Production is required!'],
        minLength: [5, 'Location is shorter than 5 characters'],
        maxLength: [15, 'Location is longer than 15 characters'],
       
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'Description is shorter than 10 characters'],
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        match: [/^https?:\/\//, 'Invalid image URL'],
    },
    likedList : [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
}, 
{ timestamps: true}
);

const Stone = mongoose.model('Stone', courseSchema);

module.exports = Stone;
