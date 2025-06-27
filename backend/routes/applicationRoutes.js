import express from 'express';
import {
    createApplication,
    getAllApplications,
    getApplicationById,
    updateApplication,
    deleteApplication
} from '../controllers/applicationController.js';

const router = express.Router();

// Event management routes
router.post('/', createApplication);         // POST /api/eventapply
router.get('/', getAllApplications);         // GET /api/eventapply
router.get('/:id', getApplicationById);      // GET /api/eventapply/:id
router.put('/:id', updateApplication);       // PUT /api/eventapply/:id
router.delete('/:id', deleteApplication);    // DELETE /api/eventapply/:id

export default router;