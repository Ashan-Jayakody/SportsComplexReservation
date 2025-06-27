import express from 'express';
import {
    createFacility,
    getAllFac,
    getFacById,
    updateFac,
    deleteFac
} from '../controllers/facilityController.js';

const router = express.Router();

// Facility management routes
router.post('/', createFacility);   // POST /api/facility
router.get('/', getAllFac);         // GET /api/facility
router.get('/:id', getFacById);        // GET /api/facility/:id
router.put('/:id', updateFac);      // PUT /api/facility/:id
router.delete('/:id', deleteFac);   // DELETE /api/facility/:id

export default router;