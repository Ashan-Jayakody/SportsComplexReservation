import mongoose from 'mongoose';

const timeSlotSchema = new mongoose.Schema({
    start_time: {
        type: String,
        required: true
    },
    end_time: {
        type: String,
        required: true
    },
    is_available: {
        type: Boolean,
        required: true
    },
    
},{timestamps:true});

const TimeSlot = mongoose.model('Time', timeSlotSchema);
export default TimeSlot;