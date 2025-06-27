import mongoose from 'mongoose';

const membershipSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    pkg_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MemPkg'
    },
    start_date: {
        type: Date,
        required: true
    },
    payment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    },
    status: {
        type: String,
        enum: ["active", "pending", "expired"],
        default: 'pending'
    }

});

const Membership = mongoose.model("Membership", membershipSchema);
export default Membership;