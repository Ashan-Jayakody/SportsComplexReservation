import Facility from "../models/Facility.js";

// @desc Create a Facility
// @Route POST /api/facility
export const createFacility = async (req, res) => {
    try{
        const newFac = await Facility.create(req.body);
        res.status(201).json(newFac);
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

// @desc Get All Facilities
// @Route GET /api/facility
export const getAllFac = async (req, res) => {
    try{
        const facilities = await Facility.find();
        res.json(facilities);
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

// @desc Get a facility by id
// @Route GET /api/facility/:id
export const getFacById = async (req, res) => {
    try{
        const facility = await Facility.findById(req.params.id);
        if (!facility)
            return res.status(404).json({error: "Facility not found"});
        res.json(facility);
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

// @desc Update a facility
// @Route PUT /api/facility/:id
export const updateFac = async (req, res) => {
    try{
        const updatedFac = await Facility.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}//this returns the updated document
        );
        if(!updatedFac) 
            return res.status(404).json({error: "Facility not found"});
        res.json(updatedFac);
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

// @desc Delete a facility
// @Route DELETE /api/facility/:id
export const deleteFac = async (req, res) => {
    try{
        const deletedFac = await Facility.findByIdAndDelete(req.params.id);
        if(!deletedFac)
            return res.status(404).json({error: "Facility not found"});
        res.json({message: "Facility removed"});
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};