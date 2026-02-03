import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel';
import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_SECRET_KEY || 'dummy_key';
const stripe = new Stripe(stripeKey, {
    apiVersion: '2024-12-18.acacia' as any
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req: Request, res: Response) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body;

        console.log('DEBUG: addOrderItems Request Body:', JSON.stringify(req.body, null, 2));

        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error('No order items');
        } else {
            // Explicitly validate user
            if (!req.user || !req.user._id) {
                res.status(401);
                throw new Error('User Invalid or Missing from Request');
            }

            const safeNumber = (val: any) => {
                const num = Number(val);
                return isNaN(num) ? 0 : num;
            };

            const order = new Order({
                orderItems: orderItems.map((x: any) => ({
                    ...x,
                    product: x._id || x.product,
                    // Ensure image is a string if it's an array from product
                    image: Array.isArray(x.images) ? x.images[0] : x.image,
                    // Map quantity to qty (handle both field names)
                    qty: x.qty || x.quantity || 1,
                })),
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice: safeNumber(itemsPrice),
                taxPrice: safeNumber(taxPrice),
                shippingPrice: safeNumber(shippingPrice),
                totalPrice: safeNumber(totalPrice),
            });

            const createdOrder = await order.save();
            console.log('DEBUG: Order Created:', createdOrder._id);
            res.status(201).json(createdOrder);
        }
    } catch (error: any) {
        console.error('DEBUG: addOrderItems Error:', error);
        res.status(500);
        throw new Error(`Order Creation Failed: ${error.message}`);
    }
});

// @desc    Create Stripe Payment Intent
// @route   POST /api/orders/create-payment-intent
// @access  Private
const createPaymentIntent = asyncHandler(async (req: Request, res: Response) => {
    const { amount } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Amount in cents
        currency: 'usd',
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = new Date();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        };

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
    const orders = await Order.find({ user: req.user?._id });
    res.json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

export { addOrderItems, updateOrderToPaid, getMyOrders, getOrderById, createPaymentIntent };
