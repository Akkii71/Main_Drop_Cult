import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Use current origin if in dev (vite proxy) or explicit URL
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const baseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as any).auth.userInfo?.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Product', 'Order', 'User'],
    endpoints: (builder) => ({}),
});
