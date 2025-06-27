import express from 'express';
import {
    createMembership,
    getAllMemberships,
    getMembershipById,
    updateMembership,
    deleteMembership
} from '../controllers/membershipController.js';

const router = express.Router();

// Membership management routes
router.post('/', createMembership);        // POST /api/membership
router.get('/', getAllMemberships);        // GET /api/membership
router.get('/:id', getMembershipById);     // GET /api/membership/:id
router.put('/:id', updateMembership);      // PUT /api/membership/:id
router.delete('/:id', deleteMembership);   // DELETE /api/membership/:id

export default router;