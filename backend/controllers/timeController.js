import TimeSlot from "../models/TimeSlot.js";

// @desc Create a time slot
// @Route POST /api/timeslots
export const createTimeSlot = async (req, res) => {
    try{
        const newSlot = await TimeSlot.create(req.body);
        res.status(201).json(newSlot);
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

// @desc Get All time slots
// @Route GET /api/timeslots
export const getAllTimeSlots = async (req, res) => {
    try{
        const slots = await TimeSlot.find();
        res.json(slots);
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

// @Get a time slot by id
// @Route GET /api/timeslots/:id
export const getTimeSlotById = async (req, res) => {
    try{
        const slot = await TimeSlot.findById(req.params.id);
        if (!slot)
            return res.status(404).json({error: "Time Slot not found"});
        res.json(slot);
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

// @desc Update a time slot
// @Route PUT /api/timeslots/:id
export const updateSlot = async (req, res) => {
    try{
        const updatedSlot = await TimeSlot.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}//this returns the updated document
        );
        if(!updatedSlot) 
            return res.status(404).json({error: "TimeSlot not found"});
        res.json(updatedSlot);
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

// @desc Delete a time slot
// @Route DELETE /api/timeslots/:id
export const deleteSlot = async (req, res) => {
    try{
        const deletedSlot = await TimeSlot.findByIdAndDelete(req.params.id);
        if(!deletedSlot)
            return res.status(404).json({error: "Time slot not found"});
        res.json({message: "Time Slot removed"});
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};