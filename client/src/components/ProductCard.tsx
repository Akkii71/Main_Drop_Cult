import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductCard = ({ product }: { product: any }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05, rotate: -1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-black border-2 border-white/20 hover:border-neon-green transition-colors overflow-hidden"
        >
            <Link to={`/product/${product._id}`}>
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden">
                    <div className="absolute inset-0 bg-neon-green/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale contrast-125 group-hover:grayscale-0"
                    />
                    {product.countInStock === 0 && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-black px-2 py-1 uppercase border border-white rotate-3">Sold Out</div>
                    )}
                    {product.countInStock > 0 && (
                        <div className="absolute top-2 right-2 bg-neon-green text-black text-xs font-black px-2 py-1 uppercase border border-black -rotate-3 opacity-0 group-hover:opacity-100 transition-opacity">Buy Now</div>
                    )}
                </div>

                <div className="p-4 border-t-2 border-white/20 relative bg-off-black">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-display font-bold uppercase text-white leading-none mb-2 group-hover:text-neon-green transition-colors">{product.name}</h3>
                            <div className="flex gap-2 flex-wrap">
                                {product.vibe?.map((v: string) => (
                                    <span key={v} className="text-[10px] font-mono border border-white/30 px-1 py-0.5 text-gray-400 uppercase">{v}</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-neon-purple font-mono font-bold text-lg">${product.price}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;
