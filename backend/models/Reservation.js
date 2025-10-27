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
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
    },
    eventType: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    slip: {
        type: String,
        required: false,
    }
},{timestamps: true});

const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;