import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    facility_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Facility'
    },
    event_name: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    reg_fee: {
        type: Number,
        required: true
    }
});

const Event = mongoose.model("Event", eventSchema);
export default Event;