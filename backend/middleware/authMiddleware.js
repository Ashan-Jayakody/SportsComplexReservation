import jwt from 'jsonwebtoken';
import User from '../models/User.js'
import asyncHandler from 'express-async-handler';

export const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            if (!token) {
                return res.status(401).json({ 
                    message: 'Not authorized, no token provided',
                    error: 'NO_TOKEN'
                });
            }

            // Verify token
            let decoded;
            try {
                decoded = jwt.verify(token, process.env.JWT_SECRET);
            } catch (jwtError) {
                if (jwtError.name === 'TokenExpiredError') {
                    return res.status(401).json({ 
                        message: 'Token expired. Please login again.',
                        error: 'TOKEN_EXPIRED'
                    });
                } else if (jwtError.name === 'JsonWebTokenError') {
                    return res.status(401).json({ 
                        message: 'Invalid token. Please login again.',
                        error: 'INVALID_TOKEN'
                    });
                } else {
                    return res.status(401).json({ 
                        message: 'Token verification failed',
                        error: 'TOKEN_VERIFICATION_FAILED'
                    });
                }
            }

            // Check if userId exists in decoded token
            if (!decoded.userId) {
                return res.status(401).json({ 
                    message: 'Invalid token format',
                    error: 'INVALID_TOKEN_FORMAT'
                });
            }

            // Attach user to request, exclude password
            const user = await User.findById(decoded.userId).select('-password');

            if (!user) {
                return res.status(401).json({ 
                    message: 'User not found',
                    error: 'USER_NOT_FOUND'
                });
            }

            req.user = user;
            next();
        } catch (error) {
            console.error('Auth middleware error:', error);
            return res.status(401).json({ 
                message: 'Not authorized, authentication failed',
                error: 'AUTH_FAILED'
            });
        }
    } else {
        return res.status(401).json({ 
            message: 'Not authorized, no token',
            error: 'NO_AUTH_HEADER'
        });
    }
});

export const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // User is an admin, proceed
  } else {
    res.status(403); 
    throw new Error('Not authorized as an admin');
  }
});
