import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<{ role: string, content: string }[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const toggleChat = () => setIsOpen(!isOpen);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        const newHistory = [...chatHistory, { role: 'user', content: message }];
        setChatHistory(newHistory);
        setMessage('');
        setIsLoading(true);

        try {
            // In a real app, use the API slice
            const { data } = await axios.post('http://localhost:5000/api/chat', {
                message,
                history: newHistory.slice(-5) // Send last 5 messages for context
            });

            setChatHistory([...newHistory, { role: 'assistant', content: data.reply }]);
        } catch (error) {
            console.error(error);
            setChatHistory([...newHistory, { role: 'assistant', content: 'My bad, the connection is glitching. Try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleChat}
                className="fixed bottom-6 right-6 bg-neon-green text-off-black p-4 rounded-full shadow-lg z-50 border-2 border-off-black"
            >
                {isOpen ? <X /> : <MessageCircle />}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.8 }}
                        className="fixed bottom-24 right-6 w-80 md:w-96 bg-off-black border border-white/20 shadow-2xl rounded-lg overflow-hidden z-50 h-[500px] flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-neon-purple p-4 flex justify-between items-center text-white">
                            <span className="font-display font-bold uppercase tracking-wider">VIBE_CHECK AI</span>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-4">
                            <div className="flex justify-start">
                                <div className="bg-white/10 p-3 rounded-tr-lg rounded-br-lg rounded-bl-lg max-w-[80%] text-sm font-mono text-gray-300">
                                    Yo! I'm your AI stylist. What vibe are you feeling today?
                                </div>
                            </div>
                            {chatHistory.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`p-3 rounded-lg max-w-[80%] text-sm font-mono ${msg.role === 'user' ? 'bg-neon-green text-black rounded-tr-none' : 'bg-white/10 text-gray-300 rounded-tl-none'}`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 p-3 rounded-lg text-sm font-mono text-gray-500 animate-pulse">
                                        Typing...
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <form onSubmit={sendMessage} className="p-4 border-t border-white/10 flex gap-2">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Ask about outfits..."
                                className="flex-1 bg-transparent border border-white/20 p-2 text-white font-mono text-sm focus:border-neon-green outline-none rounded"
                            />
                            <button type="submit" disabled={isLoading} className="bg-white/10 p-2 rounded hover:bg-neon-green hover:text-black transition-colors">
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
