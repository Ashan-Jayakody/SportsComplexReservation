import mongoose from 'mongoose';

const facilitySchema = new mongoose.Schema({
    facility_name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String
    }
});

const Facility = mongoose.model('Facility', facilitySchema);
export default Facility;