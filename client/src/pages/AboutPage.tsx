import { motion } from 'framer-motion';

const AboutPage = () => {
    return (
        <div className="container mx-auto px-6 py-24 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="space-y-8"
                >
                    <h1 className="text-5xl md:text-8xl font-display font-black leading-none">
                        WE ARE <br />
                        <span className="text-neon-purple">THE GLITCH</span> <br />
                        IN THE <br />
                        SYSTEM.
                    </h1>

                    <div className="p-6 border-l-4 border-neon-green bg-white/5 backdrop-blur-sm">
                        <p className="font-mono text-gray-300 leading-relaxed">
                            Drop Cult isn't just a brand. It's a movement. Born in the digital underground, raised on the blockchain, and worn by the future. We merge tactical utility with cyber aesthetics.
                        </p>
                    </div>

                    <div className="flex gap-4 text-sm font-mono uppercase tracking-widest text-gray-500">
                        <span>EST. 2026</span>
                        <span>//</span>
                        <span>TOKYO • NYC • METAVERSE</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="relative"
                >
                    <div className="aspect-square bg-gradient-to-br from-neon-green/20 to-neon-purple/20 border-2 border-white/20 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1535295972055-1c762f4483e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 mix-blend-overlay"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-9xl font-display font-black text-white/10 rotate-45 select-none">MANIFESTO</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Marquee Section */}
            <div className="mt-24 border-y border-white/10 py-4 overflow-hidden relative">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="whitespace-nowrap flex gap-16 font-display text-4xl text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white opacity-50"
                >
                    <span>NO RESTOCK // NO REPRINTS // LIMITED EDITION // FUTURE READY // STAY RAW //</span>
                    <span>NO RESTOCK // NO REPRINTS // LIMITED EDITION // FUTURE READY // STAY RAW //</span>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutPage;
