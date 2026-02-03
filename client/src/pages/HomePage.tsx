import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import heroIllustration from '../assets/hero-illustration.jpg';

const HomePage = () => {
    const { userInfo } = useSelector((state: any) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo) {
            navigate('/discover');
        }
    }, [userInfo, navigate]);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black text-white selection:bg-neon-purple selection:text-white">
            {/* Background Image */}
            <div className="absolute inset-0 bg-[#0088CC]">
                <img
                    src={heroIllustration}
                    className="w-full h-full object-cover opacity-100"
                    alt="Hero Illustration"
                />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between p-8 md:p-12">

                {/* Header / Top Bar */}
                <div className="flex justify-between items-center">
                    <div className="hidden md:block">
                        {/* Optional Logo or text if needed in top left, keeping it clean for now */}
                    </div>

                    <div className="flex items-center gap-4 ml-auto">
                        <Link to="/login" className="px-6 py-2 bg-black/50 backdrop-blur-md rounded-full font-mono text-xs uppercase hover:bg-white hover:text-black transition-colors border border-white/20">
                            Log In
                        </Link>
                        <Link to="/register" className="px-6 py-2 bg-neon-green text-black rounded-full font-mono text-xs uppercase font-bold hover:bg-white transition-colors">
                            Sign Up
                        </Link>
                    </div>
                </div>

                {/* Main Text Content */}
                <div className="mb-12">
                    {/* Text removed to show illustration */}

                    <div className="mt-8">
                        <Link to="/shop" className="inline-flex items-center gap-3 px-8 py-4 bg-neon-purple text-white rounded-full font-bold uppercase tracking-wider text-sm md:text-base hover:bg-white hover:text-black transition-all transform hover:scale-105">
                            Enter The Drop
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
