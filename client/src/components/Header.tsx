import { Link } from 'react-router-dom';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useLogoutMutation } from '../store/usersApiSlice';
import { logout } from '../store/authSlice';
import type { RootState } from '../store/store';

const Header = () => {
    const { cartItems } = useSelector((state: RootState) => state.cart);
    const { userInfo } = useSelector((state: RootState) => state.auth);

    const dispatch = useDispatch();
    const [logoutApi] = useLogoutMutation();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            await logoutApi(undefined).unwrap();
            dispatch(logout());
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <header className="fixed top-0 w-full z-50 bg-off-black/80 backdrop-blur-md border-b border-white/10">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-display font-bold tracking-wider text-white hover:text-neon-green transition-colors">
                    DROP_CULT
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-8 items-center font-mono text-sm uppercase tracking-wide">
                    <Link to="/shop" className="hover:text-neon-green transition-colors">Shop</Link>
                    <Link to="/drops" className="hover:text-neon-purple transition-colors">Drops</Link>
                    <Link to="/about" className="hover:text-acid-yellow transition-colors">Vibe</Link>
                </div>

                {/* Icons */}
                <div className="flex items-center gap-6">
                    {/* Cart */}
                    <Link to="/cart" className="relative group">
                        <ShoppingBag className="w-6 h-6 group-hover:text-neon-green transition-colors" />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-neon-purple text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                                {cartItems.reduce((acc: any, item: any) => acc + item.quantity, 0)}
                            </span>
                        )}
                    </Link>

                    {/* User */}
                    {userInfo ? (
                        <div className="relative group cursor-pointer py-2">
                            <User className="w-6 h-6 hover:text-neon-green transition-colors" />
                            <div className="absolute right-0 top-full pt-2 w-48 hidden group-hover:block">
                                <div className="bg-dark-gray border border-white/10 p-2 rounded shadow-xl">
                                    <Link to="/profile" className="block px-4 py-2 hover:bg-white/5 text-sm">Profile</Link>
                                    {userInfo.isAdmin && (
                                        <Link to="/admin" className="block px-4 py-2 hover:bg-white/5 text-sm">Dashboard</Link>
                                    )}
                                    <button onClick={logoutHandler} className="block w-full text-left px-4 py-2 hover:bg-white/5 text-sm text-red-500">Logout</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="hover:text-neon-green transition-colors">
                            <User className="w-6 h-6" />
                        </Link>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-off-black border-b border-white/10 p-6 flex flex-col gap-4 font-mono uppercase">
                    <Link to="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
                    <Link to="/drops" onClick={() => setIsMenuOpen(false)}>Drops</Link>
                    <Link to="/about" onClick={() => setIsMenuOpen(false)}>Vibe</Link>
                </div>
            )}
        </header>
    );
};

export default Header;
