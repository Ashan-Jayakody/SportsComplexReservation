import User from '../models/User.js';

// @desc Create users
// @route POST /api/users
export const createUser = async (req,res) => {
    try{
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    }catch(err) {
        res.status(500).json({error: err.message});
    }
};

// @desc Get all users
// @route GET /api/users
export const getAllUsers = async (req,res) => {
    try{
        const users = await User.find();
        res.json(users);
    }catch(err) {
        res.status(500).json({error: err.message});
    }
};

// @Get a user by id
// @Route GET /api/user/:id
export const getUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if (!user)
            return res.status(404).json({error: "User not found"});
        res.json(user);
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

// @desc Update a user
// @route PUT /api/users/:id
export const updateUser = async (req, res) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true} //this returns the updated document
        );
        if (!updatedUser) return res.status(404).json({error: "User not found"});
        res.json(updatedUser);
    }catch (err) {
        res.status(500).json({error: err.message});
    }
};

// @desc Delete a user
// @route DELETE /api/users/:id
export const deleteUser = async (req, res) => {
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({error: "User not found"});
        res.json({message: "User removed"});
    }catch (err) {
        res.status(500).json({error: err.message });
    }
};