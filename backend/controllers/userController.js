import User from '../models/User.js';
import bcrypt from 'bcryptjs';


// @desc Create users
// @route POST /api/users
export const createUser = async (req, res) => {
  try {
    const { fname, lname, email, password, role } = req.body;

    // Validate required fields
    if (!fname || !lname || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check for existing user
    console.log('Checking email:', email);
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      fname,
      lname,
      email,
      password: hashedPassword,
      role: role || 'user'
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Create user error:', err);
    res.status(500).json({ message: 'Server error' });
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
// @Route GET /api/users/:id
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