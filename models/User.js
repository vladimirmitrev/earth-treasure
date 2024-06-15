const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        minLength: [10, 'Email is shorter than 10 characters'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [4, 'Password is shorter than 4 characters']
    },
    createdStones: [{
        type: mongoose.Types.ObjectId,
        ref: 'Stone',
    }],
    likedStones: [{
        type: mongoose.Types.ObjectId,
        ref: 'Stone',
    }],
}, {
    collation: {
        locale: 'en',
        strength: 2
    }
},
{ timestamps: true},
);

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
