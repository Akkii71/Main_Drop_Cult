import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import { useGetOrderDetailsQuery } from '../store/ordersApiSlice';
import Message from '../components/Message';

const OrderPage = () => {
    const { id: orderId } = useParams();
    const { data: order, isLoading, error } = useGetOrderDetailsQuery(orderId);

    return (
        <div className="container mx-auto px-6 py-12">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-display font-black uppercase mb-12"
            >
                Order {orderId}
            </motion.h1>

            {isLoading ? <Loader className="animate-spin text-neon-green" /> : error ? (
                <Message variant="danger">{(error as any)?.data?.message || 'Error loading order'}</Message>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Shipping */}
                        <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-2xl">
                            <h2 className="text-2xl font-bold mb-4 text-white">Shipping</h2>
                            <p className="text-gray-400 mb-2">
                                <strong className="text-white">Name: </strong> {order.user.name}
                            </p>
                            <p className="text-gray-400 mb-2">
                                <strong className="text-white">Email: </strong> <a href={`mailto:${order.user.email}`} className="text-neon-green">{order.user.email}</a>
                            </p>
                            <p className="text-gray-400 mb-4">
                                <strong className="text-white">Address: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant="success">Delivered on {order.deliveredAt}</Message>
                            ) : (
                                <Message variant="danger">Not Delivered</Message>
                            )}
                        </div>

                        {/* Payment */}
                        <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-2xl">
                            <h2 className="text-2xl font-bold mb-4 text-white">Payment Method</h2>
                            <p className="text-gray-400 mb-4">
                                <strong className="text-white">Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant="success">Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant="danger">Not Paid</Message>
                            )}
                        </div>

                        {/* Order Items */}
                        <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-2xl">
                            <h2 className="text-2xl font-bold mb-6 text-white">Order Items</h2>
                            {order.orderItems.length === 0 ? (
                                <div className="text-red-500 font-mono">Order is empty</div>
                            ) : (
                                <div className="space-y-6">
                                    {order.orderItems.map((item: any, index: number) => (
                                        <div key={index} className="flex items-center gap-4 border-b border-white/5 pb-6 last:border-0 last:pb-0">
                                            <div className="w-16 h-16 rounded overflow-hidden">
                                                <img
                                                    src={item.image || (item.images && item.images[0]) || '/placeholder.jpg'}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <Link to={`/product/${item.product}`} className="text-white font-bold hover:text-neon-green transition-colors">
                                                    {item.name}
                                                </Link>
                                                <div className="text-sm text-gray-400 mt-1">
                                                    Size: {item.size || 'N/A'} | Color: {item.color || 'N/A'}
                                                </div>
                                            </div>
                                            <div className="font-mono text-neon-green">
                                                {item.quantity} x ${item.price} = ${(item.quantity * item.price).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 sticky top-24">
                            <h2 className="text-2xl font-black uppercase mb-8 border-b border-white/10 pb-4">Order Summary</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-400">
                                    <span>Items</span>
                                    <span className="text-white font-mono">${order.itemsPrice}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Shipping</span>
                                    <span className="text-white font-mono">${order.shippingPrice}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Tax</span>
                                    <span className="text-white font-mono">${order.taxPrice}</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold pt-4 border-t border-white/10">
                                    <span>Total</span>
                                    <span className="text-neon-green font-mono">${order.totalPrice}</span>
                                </div>
                            </div>

                            {/* PayPal/Stripe Buttons would go here for unpaid orders */}
                            {!order.isPaid && (
                                <button
                                    onClick={() => alert('Payment functionality coming soon!')}
                                    className="w-full bg-neon-purple hover:bg-neon-purple/80 text-white font-bold py-4 rounded-xl uppercase tracking-wider transition-all"
                                >
                                    Proceed to Payment
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderPage;
