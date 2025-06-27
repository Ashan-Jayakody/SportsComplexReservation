import express from 'express';
import {
    createEvent,
    getAllEvents,
    getEventByid,
    updateEvent,
    deleteEvent
} from '../controllers/eventController.js';

const router = express.Router();

// Event management routes
router.post('/', createEvent);         // POST /api/event
router.get('/', getAllEvents);         // GET /api/event
router.get('/:id', getEventByid);      // GET /api/event/:id
router.put('/:id', updateEvent);       // PUT /api/event/:id
router.delete('/:id', deleteEvent);    // DELETE /api/event/:id

export default router;