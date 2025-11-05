import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Reservation from "../models/Reservation.js";

// @desc Create a reservation
// @Route POST /api/reservation
export const createReservation = async (req, res) => {
  try {
    const { facility_id, start, eventType, end } = req.body;

    console.log("REQ.USER:", req.user);

    const user_id = req.user?._id || null;
    const slip = req.file ? req.file.path : null;

    const newReservation = await Reservation.create({
      user_id,
      facility_id,
      start,
      end,
      eventType,
      slip,
    });

    res.status(201).json(newReservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Get All Reservations (filtered by user or all for admin)
// @Route GET /api/reservation
export const getAllReservations = async (req, res) => {
  try {
    let query = {};

    // Check the role of the authenticated user
    if (req.user.role === "admin") {
      // Admins see all reservations
      query = {};
      console.log("Fetching all reservations for ADMIN");
    } else {
      // Regular users only see their own reservations
      query = { user_id: req.user._id };
      console.log(`Fetching reservations for USER: ${req.user._id}`);
    }

    const reservations = await Reservation.find(query)
      .populate("facility_id", "facility_name facility_type")
      .populate("user_id", "fname lname email");

    console.log(`Found ${reservations.length} reservations.`);

    res.json(reservations);
  } catch (err) {
    console.error("Error in getAllReservations:", err);
    res.status(500).json({ error: err.message });
  }
};

// @Get a reservation by id
// @Route GET /api/reservation/:id
export const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation)
      return res.status(404).json({ error: "Reservation not found" });
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Update a reservation
// @Route PUT /api/reservation/:id

export const updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    if (reservation.user_id.toString() !== req.user._id.toString() &&
        req.user.role !== "admin" 
      ) {
      return res
        .status(403)
        .json({ error: "Not authorized to edit this reservation." });
    }
    if (reservation.status !== "pending") {
      return res.status(403).json({
        error: `Cannot edit a reservation that is already ${reservation.status}.`,
      });
    }

    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } //this returns the updated document
    );
    res.json(updatedReservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Update reservation status
// @Route PUT /api/reservation/status/:id
export const updateReservationStatus = async (req, res) => {
  try {
    console.log("Status update request:", req.params.id, req.body);
    const { status } = req.body;

    // Validate status
    const validStatuses = ["pending", "confirmed", "cancelled"];
    if (!validStatuses.includes(status)) {
      console.log("Invalid status provided:", status);
      return res.status(400).json({
        error: "Invalid status. Must be one of: pending, confirmed, cancelled",
      });
    }

    console.log("Updating reservation:", req.params.id, "to status:", status);
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate("facility_id", "facility_name facility_type")
      .populate("user_id", "fname lname email");

    if (!updatedReservation) {
      console.log("Reservation not found:", req.params.id);
      return res.status(404).json({ error: "Reservation not found" });
    }

    console.log("Reservation updated successfully:", updatedReservation);
    res.json(updatedReservation);
  } catch (err) {
    console.error("Error updating reservation status:", err);
    res.status(500).json({ error: err.message });
  }
};

// @desc Delete a reservation
// @Route DELETE /api/reservation/:id
export const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    if (
      reservation.user_id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this reservation." });
    }
    if (reservation.status !== "pending" && req.user.role !== "admin") {
      return res.status(403).json({
        error: `Cannot cancel a reservation that is already ${reservation.status}.`,
      });
    }

    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: "Reservation removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// @desc Check reservation's time slot availability
// @Route
export const checkAvailabilityByDate = async (req, res) => {
  try {
    const { facilityId, date } = req.query; // extract query parameters

    //validate input
    if (!facilityId || !date) {
      return res.status(400).json({ message: "Missing Facility or date" });
    }

    const startOfDay = new Date(date + "T00:00:00");
    const endOfDay = new Date(date + "T23:59:59");

    const reservations = await Reservation.find({
      facility_id: facilityId,
      start: { $gte: startOfDay, $lte: endOfDay },
      status: { $ne: "cancelled" },
    }).lean();

    const bookedSlots = [];
    reservations.forEach((r) => {
      // Get the start and end hour for each reservation
      const startHour = new Date(r.start).getHours();
      // If no end time is saved, assume it's 1 hour
      const endHour = r.end ? new Date(r.end).getHours() : startHour + 1;

      // Add all hours from start up to (but not including) end
      for (let i = startHour; i < endHour; i++) {
        const hourStr = `${i.toString().padStart(2, "0")}:00`;
        if (!bookedSlots.includes(hourStr)) {
          bookedSlots.push(hourStr);
        }
      }
    });
    res.json({ bookedSlots });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching slots" });
  }
};
