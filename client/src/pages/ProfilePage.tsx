import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Package, Settings, X, Save, Loader } from 'lucide-react';
import { useUpdateProfileMutation } from '../store/usersApiSlice';
import { setCredentials } from '../store/authSlice';
import { toast } from 'react-toastify';

const ProfilePage = () => {
    const { userInfo } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [updateProfile, { isLoading }] = useUpdateProfileMutation();

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo]);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const res = await updateProfile({
                _id: userInfo._id,
                name,
                email,
                password,
            }).unwrap();
            dispatch(setCredentials({ ...res }));
            setIsEditing(false);
            toast.success('Profile updated successfully');
        } catch (err: any) {
            toast.error(err?.data?.message || err.error);
        }
    };

    if (!userInfo) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center">Please log in</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24 px-6 md:px-12 selection:bg-purple-500/30">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[150px]" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 bg-gradient-to-r from-white via-zinc-400 to-zinc-600 bg-clip-text text-transparent">
                        PROFILE
                    </h1>
                    <p className="text-zinc-500 uppercase tracking-widest text-sm font-bold">
                        Welcome back, Agent {userInfo.name}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* User Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="col-span-1 bg-zinc-900/30 backdrop-blur-xl border border-white/5 rounded-2xl p-8 h-fit"
                    >
                        <div className="flex flex-col items-center text-center mb-8">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 p-[2px] mb-4">
                                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                                    <span className="text-3xl font-black">{userInfo.name.substring(0, 1)}</span>
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-1">{userInfo.name}</h2>
                            <p className="text-zinc-500 text-sm">{userInfo.email}</p>
                            {userInfo.isAdmin && (
                                <span className="mt-3 px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 text-xs font-bold uppercase tracking-wider">
                                    Admin Access
                                </span>
                            )}
                        </div>

                        <div className="space-y-4">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="w-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all rounded-xl p-4 flex items-center gap-4 group"
                            >
                                <Settings className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
                                <span className="font-bold text-sm">Account Settings</span>
                            </button>
                        </div>
                    </motion.div>

                    {/* Orders / Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="col-span-1 lg:col-span-2 space-y-8"
                    >
                        {/* Stats Row */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Total Orders</span>
                                    <Package className="w-5 h-5 text-purple-500" />
                                </div>
                                <span className="text-4xl font-black text-white">0</span>
                            </div>
                            <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Style DNA</span>
                                    <User className="w-5 h-5 text-blue-500" />
                                </div>
                                <span className="text-xl font-bold text-white">Gen-Z Native</span>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-8 min-h-[400px]">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="w-2 h-8 bg-purple-500 rounded-full" />
                                Recent Orders
                            </h3>

                            {/* Placeholder for no orders */}
                            <div className="h-64 flex flex-col items-center justify-center text-zinc-600 border border-dashed border-zinc-800 rounded-xl">
                                <Package className="w-12 h-12 mb-4 opacity-20" />
                                <p className="text-sm font-mono uppercase">No orders found in the database</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Edit Profile Modal */}
                <AnimatePresence>
                    {isEditing && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsEditing(false)}
                                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="relative bg-zinc-900 border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl"
                            >
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="absolute top-4 right-4 text-zinc-500 hover:text-white"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                                <h2 className="text-2xl font-black mb-6">EDIT PROFILE</h2>
                                <form onSubmit={submitHandler} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-zinc-500 mb-1">Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon-purple transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-zinc-500 mb-1">Email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon-purple transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-zinc-500 mb-1">New Password</label>
                                        <input
                                            type="password"
                                            placeholder="Leave blank to keep current"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon-purple transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-zinc-500 mb-1">Confirm Password</label>
                                        <input
                                            type="password"
                                            placeholder="Confirm new password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-neon-purple transition-colors"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-neon-purple hover:bg-neon-purple/80 text-white font-bold py-3 rounded-lg mt-4 flex items-center justify-center gap-2 transition-all"
                                    >
                                        {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                        SAVE CHANGES
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ProfilePage;
