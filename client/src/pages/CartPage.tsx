import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { addToCart, removeFromCart } from '../store/cartSlice';
import { Trash2 } from 'lucide-react';
import Message from '../components/Message';

const CartPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { cartItems } = useSelector((state: RootState) => state.cart);

    const addToCartHandler = (item: any, qty: number) => {
        dispatch(addToCart({ ...item, quantity: qty }));
    };

    const removeFromCartHandler = (id: string) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-display font-black uppercase mb-12">Your Cart</h1>

            {cartItems.length === 0 ? (
                <Message>
                    Your cart is empty. <Link to="/shop" className="text-neon-green underline">Go Shop</Link>
                </Message>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {cartItems.map((item: any) => (
                            <div key={item._id} className="flex gap-4 bg-white/5 p-4 border border-white/10 items-center">
                                <div className="w-24 h-24 bg-black">
                                    <img src={item.images?.[0]} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <Link to={`/product/${item._id}`} className="font-display font-bold uppercase hover:text-neon-green">{item.name}</Link>
                                    <div className="text-sm text-gray-400 font-mono mt-1">Size: {item.size} | Color: {item.color}</div>
                                    <div className="text-neon-green font-mono font-bold mt-2">${item.price}</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <select
                                        value={item.quantity}
                                        onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                        className="bg-off-black border border-white/20 text-white font-mono h-8 px-2 outline-none text-sm"
                                    >
                                        {[...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={() => removeFromCartHandler(item._id)}
                                        className="text-red-500 hover:text-red-400"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/5 p-8 border border-white/10 sticky top-24">
                            <h2 className="text-xl font-display font-bold uppercase mb-6">Summary</h2>
                            <div className="space-y-4 font-mono text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Subtotal</span>
                                    <span>${cartItems.reduce((acc: any, item: any) => acc + item.quantity * item.price, 0).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Shipping</span>
                                    <span>Calculated at checkout</span>
                                </div>
                                <div className="border-t border-white/10 pt-4 flex justify-between text-lg font-bold text-neon-green">
                                    <span>Total</span>
                                    <span>${cartItems.reduce((acc: any, item: any) => acc + item.quantity * item.price, 0).toFixed(2)}</span>
                                </div>
                            </div>
                            <button
                                onClick={checkoutHandler}
                                disabled={cartItems.length === 0}
                                className="w-full mt-8 bg-white text-black font-display font-bold uppercase py-4 hover:bg-neon-green transition-colors disabled:opacity-50"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
