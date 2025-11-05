import Membership from "../models/Membership.js";

// @desc Create a Membership
// @Route POST /api/membership
// @Uses protect middleware, so req.user is already set
export const createMembership = async (req, res) => {
    try {
        // req.user is set by the protect middleware
        const userId = req.user._id;
        const newMembership = await Membership.create({
            ...req.body,
            user_id: userId 
        });
        
        console.log("Membership created successfully:", newMembership);
        return res.status(201).json(newMembership);
    } catch (err) {
        console.error("Error creating membership:", err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ 
                error: err.message,
                message: "Validation error. Please check your input."
            });
        }
        return res.status(500).json({ 
            error: "Internal Server Error during database save.",
            message: err.message 
        });
    }
};

// @desc Get All Memberships
// @Route GET /api/membership
export const getAllMemberships = async (req, res) => {
    try{
        const memberships = await Membership.find().populate("user_id", "fname lname email role");
        res.json(memberships);
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

// @Get a membership by id
// @Route GET /api/membership/:id
export const getMembershipById = async (req, res) => {
    try{
        const membership = await Membership.findById(req.params.id);
        if (!membership)
            return res.status(404).json({error: "Membership not found"});
        res.json(membership);
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

// @desc Update a membership
// @Route PUT /api/membership/:id
export const updateMembership = async (req, res) => {
    try{
        const updatedMembership = await Membership.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}//this returns the updated document
        );
        if(!updatedMembership) 
            return res.status(404).json({error: "Membership not found"});
        res.json(updatedMembership);
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

// @desc Delete a Membership
// @Route DELETE /api/membership/:id
export const deleteMembership = async (req, res) => {
    try{
        const deletedMembership = await Membership.findByIdAndDelete(req.params.id);
        if(!deletedMembership)
            return res.status(404).json({error: "Membership not found"});
        res.json({message: "Membership removed"});
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};