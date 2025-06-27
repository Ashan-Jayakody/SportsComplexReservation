import mongoose from 'mongoose';

const eventAppSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    apply_date: {
        type: Date,
        required: true
    },
    payment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    },
    status: {
        type: String,
        enum: ["approved", "pending", "rejected"],
        default: "pending"
    }

},{timestamps: true});

const EventApply = mongoose.model("EventApplication", eventAppSchema);
export default EventApply;