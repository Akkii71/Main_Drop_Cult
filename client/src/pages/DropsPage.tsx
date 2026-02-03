import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DropsPage = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const targetDate = new Date().getTime() + (79 * 24 * 60 * 60 * 1000);

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const timeBoxClass = "border-2 border-neon-purple p-4 md:p-8 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm";

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
            {/* Chaotic Background Elements */}
            <div className="absolute top-10 left-10 text-9xl font-display text-white/5 select-none -rotate-12">DROP</div>
            <div className="absolute bottom-10 right-10 text-9xl font-display text-white/5 select-none rotate-12">CULT</div>

            <motion.h1
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="text-6xl md:text-9xl font-display font-black text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-white to-neon-purple"
            >
                NEXT DROP
            </motion.h1>

            <div className="flex gap-4 md:gap-8 font-mono">
                <div className={timeBoxClass}>
                    <span className="text-4xl md:text-7xl font-bold text-white">{timeLeft.days}</span>
                    <span className="text-xs md:text-sm text-neon-green uppercase tracking-widest">Days</span>
                </div>
                <div className={timeBoxClass}>
                    <span className="text-4xl md:text-7xl font-bold text-white">{timeLeft.hours}</span>
                    <span className="text-xs md:text-sm text-neon-green uppercase tracking-widest">Hours</span>
                </div>
                <div className={timeBoxClass}>
                    <span className="text-4xl md:text-7xl font-bold text-white">{timeLeft.minutes}</span>
                    <span className="text-xs md:text-sm text-neon-green uppercase tracking-widest">Mins</span>
                </div>
                <div className={timeBoxClass}>
                    <span className="text-4xl md:text-7xl font-bold text-white">{timeLeft.seconds}</span>
                    <span className="text-xs md:text-sm text-neon-green uppercase tracking-widest">Secs</span>
                </div>
            </div>

            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mt-16"
            >
                <div className="bg-acid-yellow text-black font-bold uppercase py-2 px-12 transform -skew-x-12 border-2 border-white hover:bg-white hover:scale-105 transition-all cursor-pointer">
                    Get Notified
                </div>
            </motion.div>
        </div>
    );
};

export default DropsPage;
