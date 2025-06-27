import express from 'express';
import {
   createPackage,
   getAllPackages,
   getPackageById,
   updatePackage,
   deletePackage
} from '../controllers/memPkgController.js';

const router = express.Router();

// Packages management routes
router.post('/', createPackage);        // POST /api/package
router.get('/', getAllPackages);        // GET /api/package
router.get('/:id', getPackageById);     // GET /api/package/:id
router.put('/:id', updatePackage);      // PUT /api/package/:id
router.delete('/:id', deletePackage);   // DELETE /api/package/:id

export default router;