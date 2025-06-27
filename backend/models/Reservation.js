import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    facility_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Facility'
    },
    slot_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'TimeSlot'
    },
    res_date: {
        type: Date,
        required: true
    },
    total_cost: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    }
},{timestamps: true});

const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;