import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import StyleDNAQuiz from '../components/StyleDNAQuiz';
import Marquee from '../components/Marquee';
import { ArrowRight, ShoppingBag, MapPin, Search } from 'lucide-react';

const DiscoverPage = () => {
    const [showQuiz, setShowQuiz] = useState(false);

    return (
        <div className="relative w-full overflow-hidden bg-off-black text-white selection:bg-neon-purple selection:text-white">
            {showQuiz && <StyleDNAQuiz onClose={() => setShowQuiz(false)} />}

            {/* Top Navigation Bar (Floating Pill) */}
            <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/20 rounded-full px-2 py-2">
                <Link to="/" className="px-6 py-2 bg-off-black rounded-full font-mono text-xs uppercase hover:bg-white hover:text-black transition-colors border border-white/10">Home</Link>
                <Link to="/shop" className="px-6 py-2 bg-acid-yellow text-black rounded-full font-mono text-xs uppercase font-bold hover:bg-white transition-colors">Collections ▼</Link>
                <Link to="/about" className="px-6 py-2 bg-off-black rounded-full font-mono text-xs uppercase hover:bg-white hover:text-black transition-colors border border-white/10">About</Link>
                <div className="flex items-center px-4 py-2 bg-off-black rounded-full border border-white/10 text-gray-400">
                    <Search className="w-3 h-3 mr-2" />
                    <span className="font-mono text-xs">Search</span>
                </div>
                <div className="px-6 py-2 bg-off-black rounded-full font-mono text-xs uppercase border border-white/10 flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    <span>Metaverse</span>
                </div>
            </div>

            <div className="container mx-auto px-4 pt-32 pb-24">
                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[800px]">

                    {/* Main Hero Card (Large Left) */}
                    <div className="md:col-span-5 relative overflow-hidden rounded-[2rem] group">
                        {/* Background Image */}
                        <div className="absolute inset-0 bg-[#0088CC]"> {/* Fallback Blue */}
                            <img
                                src="/src/assets/hero-christmas.jpg"
                                className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-700"
                                alt="Merry Christmas"
                            />
                        </div>

                        {/* Content Overlay */}
                        <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                            <div className="w-full">
                                {/* Outlined Text Effect */}
                                <h1 className="text-5xl md:text-6xl font-display font-black leading-none tracking-tighter uppercase relative">
                                    <span className="absolute inset-0 text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>Merry</span>
                                    <span className="relative text-transparent" style={{ WebkitTextStroke: '2px white' }}>Merry</span>
                                </h1>
                                <h1 className="text-5xl md:text-6xl font-display font-black leading-none tracking-tighter uppercase relative mt-[-10px]">
                                    <span className="absolute inset-0 text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>Christmas</span>
                                    <span className="relative text-transparent" style={{ WebkitTextStroke: '2px white' }}>Christmas</span>
                                </h1>
                            </div>

                            <div className="mt-auto">
                                <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-neon-green text-black rounded-full font-bold uppercase tracking-wider hover:bg-white transition-colors">
                                    Shop The Drop
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Column Grid */}
                    <div className="md:col-span-7 grid grid-cols-2 grid-rows-3 gap-4 h-full">

                        {/* Top Wide Banner */}
                        <div className="col-span-2 row-span-1 bg-gray-200 rounded-[2rem] relative overflow-hidden flex items-center px-8 border border-white/10 group cursor-pointer">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-80 group-hover:scale-105 transition-transform duration-700"></div>
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
                            <div className="relative z-10 flex justify-between items-center w-full">
                                <span className="font-mono text-xs text-white bg-black/50 px-2 py-1 rounded backdrop-blur-md border border-white/20">SWIPE TO WINTER JACKET COLLECTION</span>
                                <ArrowRight className="text-white w-6 h-6" />
                            </div>
                        </div>

                        {/* Middle Large 3D Card */}
                        <div className="col-span-2 md:col-span-1 row-span-2 bg-off-black border border-white/20 rounded-[2rem] relative overflow-hidden p-6 flex flex-col justify-between group">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon-green/10 via-transparent to-transparent opacity-50"></div>
                            <div className="relative z-10">
                                <h3 className="font-display font-bold text-3xl uppercase italic leading-none text-white mix-blend-difference">Future <br />Fashion</h3>
                            </div>

                            {/* 3D Model Placeholder - Using a cyber fashion image */}
                            <img src="https://images.unsplash.com/photo-1617387652439-d362725fa32e?q=80&w=1000&auto=format&fit=crop" className="absolute top-0 left-0 w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" alt="Cyber Fashion" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

                            <div className="relative z-10 flex gap-2 overflow-x-auto pb-2 no-scrollbar mt-auto">
                                <button onClick={() => setShowQuiz(true)} className="px-4 py-2 bg-neon-purple rounded-full font-bold text-[10px] uppercase whitespace-nowrap hover:bg-white hover:text-black transition-colors">Find My Vibe</button>
                                <Link to="/shop" className="px-4 py-2 bg-neon-green text-black rounded-full font-bold text-[10px] uppercase whitespace-nowrap hover:bg-white transition-colors">Shop Drop</Link>
                            </div>
                        </div>

                        {/* Right Side Small Modules */}
                        <div className="col-span-2 md:col-span-1 row-span-2 flex flex-col gap-4">
                            {/* Top Module */}
                            <div className="flex-1 bg-white text-black rounded-[2rem] p-4 relative overflow-hidden group cursor-pointer border border-white/20">
                                <img src="https://images.unsplash.com/photo-1550614000-4b9519e02eb4?q=80&w=800&auto=format&fit=crop" className="absolute top-0 right-0 w-32 h-32 object-cover rounded-bl-[2rem] group-hover:scale-110 transition-transform duration-500" />
                                <h4 className="font-display font-black text-2xl uppercase relative z-10">Up To <br />40% OFF</h4>
                                <p className="text-xs font-mono mt-2 text-gray-500 relative z-10">On Outerwear</p>
                                <div className="mt-8 bg-black text-white w-8 h-8 rounded-full flex items-center justify-center relative z-10 group-hover:rotate-45 transition-transform">↗</div>
                            </div>

                            {/* Bottom Module */}
                            <div className="flex-1 bg-dark-gray border border-white/20 rounded-[2rem] p-4 relative overflow-hidden group cursor-pointer">
                                <div className="absolute inset-0 bg-neon-green/5 group-hover:bg-neon-green/10 transition-colors"></div>
                                <img src="https://images.unsplash.com/photo-1605218427368-35b0f0a4a44d?q=80&w=800&auto=format&fit=crop" className="absolute bottom-[-10%] right-[-10%] w-32 h-32 object-cover rounded-full border-4 border-off-black group-hover:rotate-12 transition-transform duration-500" />
                                <p className="font-mono text-gray-300 text-xs w-2/3 relative z-10">View The<br />Sweater<br />Collection</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Marquee Bar */}
                <div className="mt-4 bg-acid-yellow text-black rounded-full py-3 px-6 flex items-center justify-between overflow-hidden border border-white/50">
                    <Marquee text={["View Gallery", "View Gallery", "View Gallery"]} speed={10} />
                </div>
            </div>

            {/* Circular Gallery Preview */}
            <div className="container mx-auto px-4 mb-24">
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                    <div className="min-w-[100px] h-[200px] bg-black border border-white/20 rounded-full flex items-center justify-center p-2 group cursor-pointer hover:border-neon-green transition-colors">
                        <span className="text-xs font-mono writing-vertical rotate-180 uppercase tracking-widest group-hover:text-neon-green transition-colors">New Items &rarr;</span>
                    </div>
                    {[
                        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
                        'https://images.unsplash.com/photo-1529139574466-a302d2052574?q=80&w=800&auto=format&fit=crop',
                        'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop',
                        'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop'
                    ].map((img, i) => (
                        <div key={i} className="min-w-[200px] h-[200px] rounded-full overflow-hidden border-2 border-white/10 relative group cursor-pointer">
                            <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm">
                                <ShoppingBag className="text-white w-8 h-8" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default DiscoverPage;
