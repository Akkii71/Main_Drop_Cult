import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../store/cartSlice';

const PaymentPage = () => {
    const [paymentMethod, setPaymentMethod] = useState('Stripe');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const cart = useSelector((state: RootState) => state.cart);

    // if (!shippingAddress.address) {
    //     navigate('/shipping');
    // }

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <div className="container mx-auto px-6 py-12 max-w-2xl">
            <h1 className="text-4xl font-display font-black uppercase mb-8">Payment Method</h1>
            <form onSubmit={submitHandler}>
                <div className="mb-6">
                    <label className="flex items-center gap-4 bg-off-black border border-white/20 p-4 cursor-pointer hover:border-neon-green">
                        <input
                            type="radio"
                            id="Stripe"
                            name="paymentMethod"
                            value="Stripe"
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="accent-neon-green"
                        />
                        <span className="font-mono text-lg">Stripe / Credit Card</span>
                    </label>
                </div>

                <button type="submit" className="w-full bg-white text-black font-display font-bold uppercase py-4 hover:bg-neon-green transition-colors">
                    Continue
                </button>
            </form>
        </div>
    );
};

export default PaymentPage;
