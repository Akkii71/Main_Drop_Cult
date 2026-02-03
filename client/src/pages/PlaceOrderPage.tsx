import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useCreateOrderMutation } from '../store/ordersApiSlice';
import { clearCartItems } from '../store/cartSlice';
import { logout } from '../store/authSlice';

const PlaceOrderPage = () => {
    const navigate = useNavigate();
    const cart = useSelector((state: any) => state.cart);

    const [createOrder] = useCreateOrderMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping');
        } else if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

    // Calculate prices
    const addDecimals = (num: number) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    const itemsPrice = addDecimals(
        cart.cartItems.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)
    );
    const shippingPrice = addDecimals(Number(itemsPrice) > 100 ? 0 : 10);
    const taxPrice = addDecimals(Number((0.15 * Number(itemsPrice)).toFixed(2)));
    const totalPrice = (
        Number(itemsPrice) +
        Number(shippingPrice) +
        Number(taxPrice)
    ).toFixed(2);

    const placeOrderHandler = async () => {
        console.log('Place Order Clicked');
        try {
            console.log('Sending Order Data:', {
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: itemsPrice,
                shippingPrice: shippingPrice,
                taxPrice: taxPrice,
                totalPrice: totalPrice,
            });
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: itemsPrice,
                shippingPrice: shippingPrice,
                taxPrice: taxPrice,
                totalPrice: totalPrice,
            }).unwrap();
            console.log('Order Created Success:', res);
            dispatch(clearCartItems());
            const orderId = res._id || res.data?._id; // Handle potential nesting
            console.log(`Redirecting to /order/${orderId}`);
            navigate(`/order/${orderId}`);
        } catch (err: any) {
            console.error('Order Creation Failed:', err);
            const errorMessage = err?.data?.message || err.error;
            toast.error(errorMessage);

            if (err?.status === 401) {
                console.log('Auto-logging out due to 401');
                dispatch(logout()); // You'll need to import logout action
                navigate('/login');
            }
        }
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-display font-black uppercase mb-12 text-center md:text-left"
            >
                Review Order
            </motion.h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    {/* Shipping */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-zinc-900/30 border border-white/5 p-8 rounded-2xl"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-white">Shipping</h2>
                        <p className="text-gray-400 mb-2">
                            <strong className="text-white">Address: </strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                            {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                        </p>
                    </motion.div>

                    {/* Payment */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-zinc-900/30 border border-white/5 p-8 rounded-2xl"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-white">Payment Method</h2>
                        <p className="text-gray-400">
                            <strong className="text-white">Method: </strong>
                            {cart.paymentMethod}
                        </p>
                    </motion.div>

                    {/* Order Items */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-zinc-900/30 border border-white/5 p-8 rounded-2xl"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-white">Order Items</h2>
                        {cart.cartItems.length === 0 ? (
                            <div className="text-red-500 font-mono">Your cart is empty</div>
                        ) : (
                            <div className="space-y-6">
                                {cart.cartItems.map((item: any, index: number) => (
                                    <div key={index} className="flex items-center gap-4 border-b border-white/5 pb-6 last:border-0 last:pb-0">
                                        <div className="w-16 h-16 rounded overflow-hidden">
                                            <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <Link to={`/product/${item._id}`} className="text-white font-bold hover:text-neon-green transition-colors">
                                                {item.name}
                                            </Link>
                                            <div className="text-sm text-gray-400 mt-1">
                                                Size: {item.size} | Color: {item.color}
                                            </div>
                                        </div>
                                        <div className="font-mono text-neon-green">
                                            {item.quantity} x ${item.price} = ${(item.quantity * item.price).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Order Summary */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-1"
                >
                    <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 sticky top-24">
                        <h2 className="text-2xl font-black uppercase mb-8 border-b border-white/10 pb-4">Order Summary</h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-gray-400">
                                <span>Items</span>
                                <span className="text-white font-mono">${itemsPrice}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Shipping</span>
                                <span className="text-white font-mono">${shippingPrice}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Tax</span>
                                <span className="text-white font-mono">${taxPrice}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold pt-4 border-t border-white/10">
                                <span>Total</span>
                                <span className="text-neon-green font-mono">${totalPrice}</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="w-full bg-neon-purple hover:bg-neon-purple/80 text-white font-bold py-4 rounded-xl uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={cart.cartItems.length === 0}
                            onClick={placeOrderHandler}
                        >
                            Place Order
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PlaceOrderPage;
