import mongoose from "mongoose";

import Reservation from "../models/Reservation.js";

// @desc Create a reservation
// @Route POST /api/reservation
export const createReservation = async (req, res) => {
    try{
        const {facility_id, start, eventType} = req.body;
      

        const newReservation = await Reservation.create({
            facility_id,
            start,
            eventType
           
        })

        res.status(201).json(newReservation);
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

// @desc Get All Reservations
// @Route GET /api/reservation
export const getAllReservations = async (req, res) => {
    try{
        const reservations = await Reservation.find().populate("facility_id");
        res.json(reservations);
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

// @Get a reservation by id
// @Route GET /api/reservation/:id
export const getReservationById = async (req, res) => {
    try{
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation)
            return res.status(404).json({error: "Reservation not found"});
        res.json(reservation);
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

// @desc Update a reservation
// @Route PUT /api/reservation/:id
export const updateReservation = async (req, res) => {
    try{
        const updatedReservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}//this returns the updated document
        );
        if(!updatedReservation) 
            return res.status(404).json({error: "Reservation not found"});
        res.json(updatedReservation);
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

// @desc Delete a reservation
// @Route DELETE /api/reservation/:id
export const deleteReservation = async (req, res) => {
    try{
        const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
        if(!deletedReservation)
            return res.status(404).json({error: "Reservation not found"});
        res.json({message: "Reservation removed"});
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

// @desc Check reservation's time slot availability
// @Route
export const checkAvailabilityByDate = async (req, res) => {
    try {
        const { facilityId, date} = req.query;  // extract query parameters

        //validate input
        if (!facilityId || !date){
            return res.status(400).json({message: "Missing Facility or date"});
        }

        const startOfDay = new Date (date + "T00:00:00");
        const endOfDay = new Date(date + "T23:59:59");

        const reservations = await Reservation.find({
            facility_id: facilityId,
            start: { $gte: startOfDay, $lte: endOfDay},
        }).lean();

        // extract booked hours
        const bookedSlots = reservations
            .map(r => new Date(r.start).getHours())  //get only the hour
            .sort((a,b) => a-b)  //sort the hours numarically
            .map(hour => `${hour.toString().padStart(2, "0")}:00`);

        res.json({bookedSlots});

    }catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error fetching slots" });
    }
}
