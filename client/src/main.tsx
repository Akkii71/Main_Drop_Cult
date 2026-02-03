import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import store from './store/store';
import App from './App';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ProfilePage from './pages/ProfilePage';
import DropsPage from './pages/DropsPage';
import AboutPage from './pages/AboutPage';
import DiscoverPage from './pages/DiscoverPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/shipping" element={<ShippingPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/placeorder" element={<PlaceOrderPage />} />
      <Route path="/order/:id" element={<OrderPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/drops" element={<DropsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/discover" element={<DiscoverPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>,
);
