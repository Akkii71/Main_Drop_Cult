import { motion } from 'framer-motion';

const Marquee = ({ text, direction = 'left', speed = 20 }: { text: string[], direction?: 'left' | 'right', speed?: number }) => {
    return (
        <div className="overflow-hidden border-y border-white/20 py-2 bg-neon-green/5 backdrop-blur-sm relative z-10">
            <motion.div
                initial={{ x: direction === 'left' ? '0%' : '-50%' }}
                animate={{ x: direction === 'left' ? '-50%' : '0%' }}
                transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
                className="flex gap-8 whitespace-nowrap"
            >
                {[...text, ...text, ...text, ...text].map((t, i) => (
                    <span key={i} className="text-4xl md:text-6xl font-display font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 opacity-80">
                        {t} •
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export default Marquee;
