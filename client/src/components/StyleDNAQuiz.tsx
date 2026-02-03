import { useState } from 'react';
import { motion } from 'framer-motion';

const StyleDNAQuiz = ({ onClose }: { onClose: () => void }) => {
    const [step, setStep] = useState(0);
    const [score, setScore] = useState({ Cyber: 0, Street: 0, Goth: 0, Y2K: 0 });

    const questions = [
        {
            q: "Pick a night out:",
            a: [
                { text: "Underground Rave", vibe: "Cyber" },
                { text: "Rooftop Chill", vibe: "Street" },
                { text: "Graveyard Walk", vibe: "Goth" },
                { text: "Retro Arcade", vibe: "Y2K" }
            ]
        },
        {
            q: "Select your weapon:",
            a: [
                { text: "Katana", vibe: "Cyber" },
                { text: "Spray Can", vibe: "Street" },
                { text: "Spells", vibe: "Goth" },
                { text: "Flip Phone", vibe: "Y2K" }
            ]
        }
    ];

    const handleAnswer = (vibe: keyof typeof score) => {
        setScore({ ...score, [vibe]: score[vibe] + 1 });
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            // Finish
            const finalVibe = Object.keys(score).reduce((a, b) => score[a as keyof typeof score] > score[b as keyof typeof score] ? a : b);
            alert(`Your Vibe is: ${finalVibe}`);
            onClose();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
        >
            <div className="bg-dark-gray p-8 border border-white/20 max-w-md w-full text-center">
                <h2 className="text-3xl font-display font-bold uppercase mb-8 text-neon-green">Style DNA Analysis</h2>
                <div className="text-xl font-mono mb-8">{questions[step].q}</div>
                <div className="grid grid-cols-1 gap-4">
                    {questions[step].a.map((ans) => (
                        <button
                            key={ans.text}
                            onClick={() => handleAnswer(ans.vibe as any)}
                            className="bg-white/10 p-4 hover:bg-neon-purple hover:text-white transition-colors uppercase font-bold"
                        >
                            {ans.text}
                        </button>
                    ))}
                </div>
                <button onClick={onClose} className="mt-8 text-sm text-gray-500 underline">Close Generator</button>
            </div>
        </motion.div>
    );
};

export default StyleDNAQuiz;
