import mongoose from 'mongoose';

const memPkgSchema = new mongoose.Schema({
    pkg_name: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        enum: ["month", "6 months" ,"year"],
        default: "month"
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number
    }
});

const MemPkg = mongoose.model('MemPkg', memPkgSchema);
export default MemPkg;