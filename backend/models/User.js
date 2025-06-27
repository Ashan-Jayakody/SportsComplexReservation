import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    reg_date: {
        type: Date,
        required: true
    },
    NIC: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);
export default User;
