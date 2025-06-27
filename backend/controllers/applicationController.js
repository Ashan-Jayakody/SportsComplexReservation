import EventApply from "../models/Application.js";
// @desc create an Event application
// @Route POST /api/eventapply
export const createApplication = async (req, res) => {
    try{
        const newApplication = await EventApply.create(req.body);
        res.status(201).json(newApplication);
    }catch (err) {
        res.status(500).json({ error: err.message});
    }
};

// @desc get all event applycations
// @Route GET /api/eventapply
export const getAllApplications = async (req, res) => {
    try{
        const applications = await EventApply.find();
        res.json(applications);
    }catch (err) {
        res.status(500).json({ error: err.message});
    }
};

// @desc get an application by id
// @Route GET /api/eventapply/:id
export const getApplicationById = async (req, res) => {
    try{
        const appplication = await EventApply.findById(req.params.id);
        if(!appplication)
            return res.status(404).json({ error: "Application not found"});
        res.json(appplication);
    }catch (err) {
        res.status(500).json({ error: err.message});
    }
};

// @desc gupdate an application 
// @Route PUT /api/eventapply/:id
export const updateApplication = async (req, res) => {
    try{
        const updatedApplication = await EventApply.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}//this returns the updated document
        );
        if(!updatedApplication)
            return res.status(404).json({ error: "Application not found"});
        res.json(updatedApplication);
    }catch (err) {
        res.status(500).json({error : err.message});
    }
};

// @desc Delete an application
// @Route DELETE /api/eventapply/:id
export const deleteApplication = async (req, res) => {
    try{
        const deletedApplication = await EventApply.findByIdAndDelete(req.params.id);
        if(!deletedApplication)
            return res.status(404).json({error: "Appplication not found"});
        res.json({message: "Application removed"});
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};