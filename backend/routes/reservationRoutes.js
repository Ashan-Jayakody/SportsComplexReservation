import express from 'express';
import multer from 'multer';
import path from 'path';
import {
    createReservation,
    getAllReservations,
    getReservationById,
    updateReservation,
    deleteReservation,
    checkAvailabilityByDate,
    updateReservationStatus
} from '../controllers/reservationController.js';

import {protect, admin} from '../middleware/authMiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Make sure this 'uploads/slips' folder exists in your backend
    cb(null, 'uploads/slips/'); 
  },
  filename: function (req, file, cb) {
    // This creates a unique filename but keeps the original file extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname); 
    
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

const upload = multer({ storage: storage });

// Reservation management routes
router.get('/check/availability-by-date', checkAvailabilityByDate);  // GET /api/reservation/check/availability
router.post('/',protect,upload.single('slip'), createReservation);        // POST /api/reservation
router.get('/user-reservations', protect, getAllReservations);        // GET /api/reservation/user-reservations (user's reservations)
router.get('/', protect, getAllReservations);        // GET /api/reservation (all reservations for admin)

router.get('/:id',protect, getReservationById);        // GET /api/reservation/:id
router.put('/:id', protect, updateReservation);      // PUT /api/reservation/:id
router.delete('/:id',protect, deleteReservation);   // DELETE /api/reservation/:id
router.put('/status/:id', protect,admin, updateReservationStatus);
export default router;