import { useGetProductsQuery } from '../store/productsApiSlice';
import ProductCard from '../components/ProductCard';
import { useState } from 'react';
import { motion } from 'framer-motion';

const ShopPage = () => {
    const [keyword] = useState('');
    const [vibe, setVibe] = useState('');

    // For demo purposes, we will use hardcoded vibes
    const vibes = ['Cyber', 'Street', 'Goth', 'Y2K', 'Retro'];

    const { data, isLoading, error } = useGetProductsQuery({ keyword, vibe });

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <motion.h1
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="text-4xl md:text-6xl font-display font-black uppercase"
                >
                    The Collection
                </motion.h1>

                {/* Filters */}
                <div className="flex gap-4 mt-6 md:mt-0 overflow-x-auto pb-2">
                    <button
                        onClick={() => setVibe('')}
                        className={`px-4 py-2 text-sm font-mono border ${vibe === '' ? 'bg-white text-off-black border-white' : 'border-white/20 text-gray-400 hover:border-white'}`}
                    >
                        ALL
                    </button>
                    {vibes.map((v) => (
                        <button
                            key={v}
                            onClick={() => setVibe(v)}
                            className={`px-4 py-2 text-sm font-mono border ${vibe === v ? 'bg-neon-green text-off-black border-neon-green' : 'border-white/20 text-gray-400 hover:border-neon-green'}`}
                        >
                            {v}
                        </button>
                    ))}
                </div>
            </div>

            {isLoading ? (
                <div className="text-center text-neon-green font-mono animate-pulse">LOADING_DATA...</div>
            ) : error ? (
                <div className="text-center text-red-500 font-mono">ERROR LOADING PRODUCTS</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {data.products.map((product: any) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShopPage;
