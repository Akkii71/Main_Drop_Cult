import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import User, { IUser } from '../models/userModel';

// Extend Request interface to include user
declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

            req.user = await User.findById(decoded.userId).select('-password') as IUser;

            next();
        } catch (error: any) {
            console.error('Auth Middleware Error:', error.message);
            res.status(401);
            throw new Error(`Not authorized, token failed: ${error.message}`);
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

const admin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

export { protect, admin };
