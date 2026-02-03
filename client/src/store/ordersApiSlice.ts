import { apiSlice } from './apiSlice';

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: '/orders',
                method: 'POST',
                body: order,
            }),
        }),
        getOrderDetails: builder.query({
            query: (id) => ({
                url: `/orders/${id}`
            }),
            keepUnusedDataFor: 5
        }),
        payOrder: builder.mutation({
            query: ({ orderId, details }) => ({
                url: `/orders/${orderId}/pay`,
                method: 'PUT',
                body: details,
            }),
        }),
        getMyOrders: builder.query({
            query: () => ({
                url: '/orders/myorders',
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery, usePayOrderMutation, useGetMyOrdersQuery } = ordersApiSlice;
