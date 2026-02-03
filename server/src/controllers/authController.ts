import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel';
import generateToken from '../utils/generateToken';
import jwt from 'jsonwebtoken';

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        const accessToken = generateToken(res, user._id);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            styleDNA: user.styleDNA,
            token: accessToken
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        const accessToken = generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: accessToken
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
const logoutUser = (req: Request, res: Response) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};


// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public
const refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.jwt;

    if (!refreshToken) {
        res.status(401);
        throw new Error('Not authorized, no refresh token');
    }

    try {
        const decoded: any = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string);
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            res.status(401);
            throw new Error('User not found');
        }

        // Generate new Access Token
        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '15m' });

        res.json({ token: accessToken });
    } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error('Not authorized, token failed');
    }
});


import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @desc    Google Login
// @route   POST /api/auth/google
// @access  Public
const googleLogin = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.body; // This is the Access Token from frontend Implicit Flow
    console.log('Backend Received Google Login Request with token:', token ? 'Token exists' : 'No Token');

    if (!token) {
        res.status(400);
        throw new Error('Google token is required');
    }

    try {
        // 1. Verify Access Token & Audience (Security: Prevent Confused Deputy)
        // Manual fetch to avoid "No credentials" error from google-auth-library
        const tokenInfoResponse = await fetch(`https://oauth2.googleapis.com/tokeninfo?access_token=${token}`);

        if (!tokenInfoResponse.ok) {
            console.error('Token Info Fetch Failed:', await tokenInfoResponse.text());
            res.status(400);
            throw new Error('Invalid Google Token');
        }

        const tokenInfo = await tokenInfoResponse.json();

        // Ensure the token was issued for OUR client
        if (tokenInfo.aud !== process.env.GOOGLE_CLIENT_ID) {
            console.error('Token Audience Mismatch. Expected:', process.env.GOOGLE_CLIENT_ID, 'Got:', tokenInfo.aud);
            res.status(401);
            throw new Error('Unauthorized: Invalid token audience');
        }

        // 2. Fetch User Profile
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!userInfoResponse.ok) {
            console.error('User Info Fetch Failed:', await userInfoResponse.text());
            res.status(400);
            throw new Error('Failed to fetch user profile from Google');
        }

        const userInfo = await userInfoResponse.json();
        const { name, email, sub } = userInfo as any;

        let user = await User.findOne({ email });

        if (user) {
            // If user exists but no googleId (legacy login), link it
            if (!user.googleId) {
                user.googleId = sub;
                await user.save();
            }
        } else {
            // Create new user
            user = await User.create({
                name,
                email,
                password: Date.now().toString(36) + Math.random().toString(36), // Random password
                googleId: sub,
            });
        }

        const accessToken = generateToken(res, user._id);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: accessToken
        });

    } catch (error) {
        console.error('Google Login Error:', error);
        res.status(400);
        throw new Error('Google Sign-In Failed');
    }
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findById(req.user?._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(res, updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export { loginUser, registerUser, logoutUser, refreshToken, googleLogin, updateUserProfile };
