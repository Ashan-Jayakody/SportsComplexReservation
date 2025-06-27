import MemPkg from "../models/MemPkg.js";

// @desc Create a Package
// @Route POST /api/package
export const createPackage = async (req, res) => {
    try{
        const newPackage = await MemPkg.create(req.body);
        res.status(201).json(newPackage);
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

// @desc Get All Packages
// @Route GET /api/package
export const getAllPackages = async (req, res) => {
    try{
        const packages = await MemPkg.find();
        res.json(packages);
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

// @Get a package by id
// @Route GET /api/package/:id
export const getPackageById = async (req, res) => {
    try{
        const memPackage = await MemPkg.findById(req.params.id);
        if (!memPackage)
            return res.status(404).json({error: "Invalid Package"});
        res.json(memPackage);
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

// @desc Update a package
// @Route PUT /api/package/:id
export const updatePackage = async (req, res) => {
    try{
        const updatedPackage = await MemPkg.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}//this returns the updated document
        );
        if(!updatedPackage) 
            return res.status(404).json({error: "Package not found"});
        res.json(updatedPackage);
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

// @desc Delete a package
// @Route DELETE /api/package/:id
export const deletePackage = async (req, res) => {
    try{
        const deletedPackage = await MemPkg.findByIdAndDelete(req.params.id);
        if(!deletedPackage)
            return res.status(404).json({error: "Package not found"});
        res.json({message: "Package removed"});
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};