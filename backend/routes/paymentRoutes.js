import express from 'express';
import {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment
} from '../controllers/paymentController.js';

const router = express.Router();

// Payment management routes
router.post('/', createPayment);        // POST /api/payment
router.get('/', getAllPayments);        // GET /api/payment
router.get('/:id', getPaymentById);     // GET /api/payment/:id
router.put('/:id', updatePayment);      // PUT /api/payment/:id
router.delete('/:id', deletePayment);   // DELETE /api/payment/:id

export default router;