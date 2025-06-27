import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true
    },
    payment_date: {
        type: Date,
        required: true
    },
    payment_method: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["approved", "pending", "rejected"],
        default: 'pending'
    }

});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;