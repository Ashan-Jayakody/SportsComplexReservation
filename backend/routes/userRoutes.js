import express from 'express';
import {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
} from '../controllers/userController.js';

const router = express.Router();

//User management routes
router.post('/',createUser);         //POST /api/users
router.get('/',getAllUsers);         //GET /api/users
router.get('/:id',getUser);          //GET /api/users/:id
router.put('/:id',updateUser);       //PUT /api/users/:id
router.delete('/:id',deleteUser);    //DELETE /api/users/:id

export default router;