import express from 'express';
import { loginUser, registerUser, logoutUser, refreshToken, googleLogin, updateUserProfile } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleLogin);
router.post('/logout', logoutUser);
router.post('/refresh', refreshToken);
router.route('/profile').put(protect, updateUserProfile);

export default router;
