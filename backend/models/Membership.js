import mongoose from 'mongoose';

const membershipSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    pkg: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    reg_date: {
        type: Date,
        required: true
    },
    NIC: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "pending", "expired"],
        default: 'pending'
    }

});

const Membership = mongoose.model("Membership", membershipSchema);
export default Membership;