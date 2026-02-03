import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useGetProductDetailsQuery } from '../store/productsApiSlice';
import { addToCart } from '../store/cartSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { motion } from 'framer-motion';

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');

    const { data: product, isLoading, error } = useGetProductDetailsQuery(id);

    const addToCartHandler = () => {
        if (!size || !color) {
            alert('Please select size and color'); // Should be a better UI alert
            return;
        }
        dispatch(addToCart({ ...product, quantity: qty, size, color }));
        navigate('/cart');
    };

    if (isLoading) return <Loader />;
    if (error) return <Message variant='danger'>Product Not Found</Message>;

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image Gallery (Simple for now) */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                >
                    <div className="aspect-[3/4] overflow-hidden bg-white/5 border border-white/10">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                </motion.div>

                {/* Details */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col h-full"
                >
                    <h1 className="text-4xl md:text-6xl font-display font-black uppercase leading-none">{product.name}</h1>
                    <div className="flex items-center gap-4 mt-4">
                        <span className="text-2xl font-mono text-neon-green font-bold">${product.price}</span>
                        {product.countInStock > 0 ? (
                            <span className="text-xs uppercase bg-white/10 px-2 py-1 text-green-400">In Stock</span>
                        ) : (
                            <span className="text-xs uppercase bg-white/10 px-2 py-1 text-red-400">Sold Out</span>
                        )}
                    </div>

                    <p className="mt-8 text-gray-400 font-mono text-sm leading-relaxed border-l-2 border-neon-purple pl-4">{product.description}</p>

                    {/* Selectors */}
                    <div className="mt-12 space-y-6">
                        {/* Size */}
                        <div>
                            <span className="block text-xs font-mono text-gray-500 uppercase mb-2">Select Size</span>
                            <div className="flex gap-2">
                                {product.sizes?.map((s: string) => (
                                    <button
                                        key={s}
                                        onClick={() => setSize(s)}
                                        className={`w-12 h-12 flex items-center justify-center font-mono text-sm border ${size === s ? 'bg-white text-black border-white' : 'border-white/20 text-gray-400 hover:border-white'}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color */}
                        <div>
                            <span className="block text-xs font-mono text-gray-500 uppercase mb-2">Select Color</span>
                            <div className="flex gap-2">
                                {product.colors?.map((c: string) => (
                                    <button
                                        key={c}
                                        onClick={() => setColor(c)}
                                        className={`px-4 h-12 flex items-center justify-center font-mono text-sm border ${color === c ? 'bg-white text-black border-white' : 'border-white/20 text-gray-400 hover:border-white'}`}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Qty */}
                        <div>
                            <span className="block text-xs font-mono text-gray-500 uppercase mb-2">Quantity</span>
                            <select
                                value={qty}
                                onChange={(e) => setQty(Number(e.target.value))}
                                className="bg-off-black border border-white/20 text-white font-mono h-12 px-4 focus:border-neon-green outline-none"
                            >
                                {[...Array(product.countInStock).keys()].map((x) => (
                                    <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-auto pt-12">
                        <button
                            onClick={addToCartHandler}
                            disabled={product.countInStock === 0}
                            className="w-full bg-neon-green hover:bg-white text-off-black font-display font-bold uppercase text-xl py-6 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductPage;
