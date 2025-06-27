import express from 'express';
import {
    createReservation,
    getAllReservations,
    getReservationById,
    updateReservation,
    deleteReservation
} from '../controllers/reservationController.js';

const router = express.Router();

// Reservation management routes
router.post('/', createReservation);        // POST /api/reservation
router.get('/', getAllReservations);        // GET /api/reservation
router.get('/:id', getReservationById);        // GET /api/reservation/:id
router.put('/:id', updateReservation);      // PUT /api/reservation/:id
router.delete('/:id', deleteReservation);   // DELETE /api/reservation/:id

export default router;