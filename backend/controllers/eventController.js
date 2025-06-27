import Event from "../models/Events.js";

// @desc create an Event
// @Route POST /api/event
export const createEvent = async (req, res) => {
    try{
        const newEvent = await Event.create(req.body);
        res.status(201).json(newEvent);
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

// @desc get All Events
// @ GET /api/event
export const getAllEvents = async (req, res) => {
    try{
        const events = await Event.find();
        res.json(events);
    }catch (err) {
        res.status(500).json({ error: err.message});
    }
};

// @desc Get an Event by id
// @Route GET /api/event/:id
export const getEventByid = async (req, res) => {
    try{
        const event = await Event.findById(req.params.id);
        if(!event)
            return res.status(404).json({ error: "Event not found"});
        res.json(event);
    }catch (err) {
        res.status(500).json({ error: err.message});
    }
};

// @desc Update an event
// @Route PUT /api/event/:id
export const updateEvent = async (req, res) => {
    try{
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}//this returns the updated document
        );
        if(!updatedEvent) 
            return res.status(404).json({error: "Event not found"});
        res.json(updatedEvent);
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

// @desc Delete an event
// @Route DELETE /api/event/:id
export const deleteEvent = async (req, res) => {
    try{
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if(!deletedEvent)
            return res.status(404).json({error: "Event not found"});
        res.json({message: "Event removed"});
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};