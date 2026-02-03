import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store/store';
import { saveShippingAddress } from '../store/cartSlice';
import AddressAutocomplete from '../components/AddressAutocomplete';

const ShippingPage = () => {
    const cart = useSelector((state: RootState) => state.cart);
    // const { shippingAddress } = cart; // TODO: Type this

    const [address, setAddress] = useState(cart.shippingAddress?.address || '');
    const [city, setCity] = useState(cart.shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(cart.shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(cart.shippingAddress?.country || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    };

    const handleAddressSelect = (selectedAddress: string, selectedCity: string, selectedPostalCode: string, selectedCountry: string) => {
        setAddress(selectedAddress);
        setCity(selectedCity);
        setPostalCode(selectedPostalCode);
        setCountry(selectedCountry);
    };

    return (
        <div className="container mx-auto px-6 py-12 max-w-2xl">
            <h1 className="text-4xl font-display font-black uppercase mb-8">Shipping</h1>
            <form onSubmit={submitHandler} className="space-y-6">
                <div>
                    <label className="block text-sm font-mono text-gray-400 mb-2">Address</label>
                    <AddressAutocomplete
                        value={address}
                        onChange={setAddress}
                        onSelect={handleAddressSelect}
                    />
                </div>
                <div>
                    <label className="block text-sm font-mono text-gray-400 mb-2">City</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-off-black border border-white/20 p-4 text-white focus:border-neon-green outline-none"
                        required
                    />
                </div>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-mono text-gray-400 mb-2">Postal Code</label>
                        <input
                            type="text"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="w-full bg-off-black border border-white/20 p-4 text-white focus:border-neon-green outline-none"
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-mono text-gray-400 mb-2">Country</label>
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full bg-off-black border border-white/20 p-4 text-white focus:border-neon-green outline-none"
                            required
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <button type="submit" className="w-full bg-white text-black font-display font-bold uppercase py-4 hover:bg-neon-green hover:text-black transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                        Continue to Payment
                    </button>
                    <p className="mt-4 text-center text-xs text-gray-500 font-mono">
                        * Auto-filled by OpenStreetMap. Verify details before proceeding.
                    </p>
                </div>
            </form>
        </div>
    );
};

export default ShippingPage;
