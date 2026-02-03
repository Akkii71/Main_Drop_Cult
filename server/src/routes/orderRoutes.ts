import express from 'express';
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    createPaymentIntent
} from '../controllers/orderController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/create-payment-intent').post(protect, createPaymentIntent);

export default router;
