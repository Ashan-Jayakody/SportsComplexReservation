import fs from 'fs';
import gracefulFs from 'graceful-fs';

gracefulFs.gracefulify(fs);
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import facilityRoutes from './routes/facilityRoutes.js';
import timeSlotRoutes from './routes/timeSlotRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import memPkgRoutes from './routes/memPkgRoutes.js';
import membershipRoutes from './routes/membershipRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json()); //parses incoming requests

//Routes
app.use('/api/users', userRoutes);              //all routes are prefixed with /api/users
app.use('/api/facility', facilityRoutes);       //all routes are prefixed with /api/facility
app.use('/api/timeslots', timeSlotRoutes)       //all routes are prefixed with /api/timeslots
app.use('/api/reservation', reservationRoutes)  //all routes are prefixed with /api/reservation
app.use('/api/package', memPkgRoutes)           //all routes are prefixed with /api/package
app.use('/api/membership', membershipRoutes)    //all routes are prefixed with /api/membership
app.use('/api/payment', paymentRoutes)          //all routes are prefixed with /api/payment
app.use('/api/event', eventRoutes)              //all routes are prefixed with /api/event
app.use('/api/eventapply', applicationRoutes) //all routes are prefixed with /api/eventapply
//MongoDB connection
const startServer = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Successfully connected to MongoDB");

        const server = app.listen(port, () =>{
            console.log(`Server running on port ${port}`);
        });

    } catch(err){
        console.error('Faild to start server:', err);
        process.exit(1);
    }

};

startServer();