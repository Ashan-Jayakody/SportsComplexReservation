import express from 'express';
import {
    createTimeSlot,
    getAllTimeSlots,
    getTimeSlotById,
    updateSlot,
    deleteSlot
} from '../controllers/timeController.js';

const router = express.Router();

// Timeslot management routes
router.post('/', createTimeSlot);     // POST /api/timeslotes
router.get('/', getAllTimeSlots);     // GET /api/timeslots
router.get('/:id', getTimeSlotById);     // GET /api/timeslots/:id
router.put('/:id', updateSlot);       // PUT /api/timeslots/:id
router.delete('/:id', deleteSlot);    // DELETE /api/timeslots/:id

export default router;