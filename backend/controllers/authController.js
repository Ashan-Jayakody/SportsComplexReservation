import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc Login User
// @route Post /api/auth/login
export const loginUser = async (req, res) => {


    try {
        const { email, password } = req.body;

        //check is user exists
        const user = await User.findOne({ email: email.toLowerCase()});
        if (!user) {
            return res.status(400).json({ message: 'invalid email or password'});
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password"});
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id, role:user.role }, process.env.JWT_SECRET, {expiresIn: '1d'}
        );

        res.status(200).json({
            message: 'Login Successful',
            token,
            user: {
                id: user._id,
                fname: user.fname,
                lname: user.lname,
                email: user.email,
                role: user.role,
            },
        });
    }catch (err) {
        res.status(500).json({ message: err.message});
    }
};