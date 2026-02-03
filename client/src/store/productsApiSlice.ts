import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ keyword, pageNumber, vibe }: { keyword?: string; pageNumber?: number; vibe?: string }) => ({
                url: '/products',
                params: { keyword, pageNumber, vibe },
            }),
            keepUnusedDataFor: 5,
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `/products/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice;
