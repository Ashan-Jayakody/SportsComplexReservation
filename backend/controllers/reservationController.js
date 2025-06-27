import Reservation from "../models/Reservation.js";

// @desc Create a reservation
// @Route POST /api/reservation
export const createReservation = async (req, res) => {
    try{
        const newReservation = await Reservation.create(req.body);
        res.status(201).json(newReservation);
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

// @desc Get All Reservations
// @Route GET /api/reservation
export const getAllReservations = async (req, res) => {
    try{
        const reservations = await Reservation.find();
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