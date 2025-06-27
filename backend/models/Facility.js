import mongoose from 'mongoose';

const facilitySchema = new mongoose.Schema({
    facility_name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    is_available: {
        type: Boolean,
        required: true
    }
});

const Facility = mongoose.model('Facility', facilitySchema);
export default Facility;