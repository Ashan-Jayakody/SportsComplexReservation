import Payment from "../models/Payment.js";

// @desc Create a Payment
// @Route POST /api/payment
export const createPayment = async (req, res) => {
    try{
        const newPayment = await Payment.create(req.body);
        res.status(201).json(newPayment);
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

// @desc Get All payments
// @Route GET /api/payment
export const getAllPayments = async (req, res) => {
    try{
        const payments = await Payment.find();
        res.json(payments);
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

// @Get a payment by id
// @Route GET /api/payment/:id
export const getPaymentById = async (req, res) => {
    try{
        const payment = await Payment.findById(req.params.id);
        if (!payment)
            return res.status(404).json({error: "Payment not found"});
        res.json(payment);
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

// @desc Update a payment
// @Route PUT /api/payment/:id
export const updatePayment = async (req, res) => {
    try{
        const updatedPayment = await Payment.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}//this returns the updated document
        );
        if(!updatedPayment) 
            return res.status(404).json({error: "Payment not found"});
        res.json(updatedPayment);
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

// @desc Delete a payment
// @Route DELETE /api/payment/:id
export const deletePayment = async (req, res) => {
    try{
        const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
        if(!deletedPayment)
            return res.status(404).json({error: "Payment not found"});
        res.json({message: "payment removed"});
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};