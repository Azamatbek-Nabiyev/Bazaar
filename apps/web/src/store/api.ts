import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Order, OrdersResponse, RequestOrder } from "../types/order";
import type { Review, ReviewEligibility, ReviewsResponse } from "../types/review";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:8000",
    prepareHeaders: (headers, { getState }) => {
      // token bo'lsa, har bir so'rovga avtomatik qo'shish
      const token = (getState() as any).auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Product", "Category", "User", "Order", "Review"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
    }),
    getCategories: builder.query({
      query: () => "/categories",
    }),
    getProductById: builder.query({
      query: (id: string) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),

    // 👇 auth qismi
    signupRequest: builder.mutation({
      query: (body: { phone: string; fullname: string }) => ({
        url: "/users/signup-request",
        method: "POST",
        body,
      }),
    }),
    signupConfirm: builder.mutation({
      query: (body: { token: string; code: string }) => ({
        url: "/users/signup-confirm",
        method: "POST",
        body,
      }),
    }),
    loginRequest: builder.mutation({
      query: (body: { phone: string }) => ({
        url: "/users/login-request",
        method: "POST",
        body,
      }),
    }),
    loginConfirm: builder.mutation({
      query: (body: { phone: string; code: string }) => ({
        url: "/users/login-verify",
        method: "POST",
        body,
      }),
    }),

    // user ga tegishli bo'lgan malumotlar
    updateMe: builder.mutation({
      query: (body: { fullname: string; phone: string }) => ({
        url: "/users/me",
        method: "PATCH",
        body,
      }),
    }),
    getMyOrders: builder.query <OrdersResponse, void>({
      query: () => "/users/me/orders",
      providesTags: ["Order"],
    }),
    createAddress: builder.mutation({
      query: (body: { city: string; address: string }) => ({
        url: "/users/me/address",
        method: "POST",
        body,
      }),
    }),
    updateAddress: builder.mutation({
      query: ({
        addressId,
        city,
        address,
      }: {
        addressId: string;
        city: string;
        address: string;
      }) => ({
        url: `/users/me/address/${addressId}`,
        method: "PATCH",
        body: {
          city,
          address,
        },
      }),
    }),

    deleteAddress: builder.mutation({
      query: (addressId: string) => ({
        url: `/users/me/address/${addressId}`,
        method: "DELETE",
      }),
    }),

    // order yaratish
    createOrder: builder.mutation({
      query: ({ shippingAddress, paymentMethod, items }: RequestOrder) => ({
        url: '/orders',
        method: 'POST',
        body: {
          shippingAddress,
          paymentMethod,
          items
        }
      }),
      invalidatesTags: ["Order"],
    }),

    // buyurtmani bekor qilish (faqat "pending" holatida)
    cancelOrder: builder.mutation<Order, string>({
      query: (id) => ({
        url: `/orders/${id}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["Order"],
    }),

    // mahsulot sharhlari
    getProductReviews: builder.query<ReviewsResponse, string>({
      query: (productId) => `/products/${productId}/reviews`,
      providesTags: ["Review"],
    }),
    getReviewEligibility: builder.query<{ status: string; data: ReviewEligibility }, string>({
      query: (productId) => `/products/${productId}/reviews/eligibility`,
      providesTags: ["Review"],
    }),
    submitReview: builder.mutation<Review, { productId: string; rating: number; comment?: string }>({
      query: ({ productId, rating, comment }) => ({
        url: `/products/${productId}/reviews`,
        method: "POST",
        body: { rating, comment },
      }),
      invalidatesTags: (_result, _error, { productId }) => ["Review", { type: "Product", id: productId }],
    }),
    updateReview: builder.mutation<Review, { productId: string; rating: number; comment?: string }>({
      query: ({ productId, rating, comment }) => ({
        url: `/products/${productId}/reviews/me`,
        method: "PATCH",
        body: { rating, comment },
      }),
      invalidatesTags: (_result, _error, { productId }) => ["Review", { type: "Product", id: productId }],
    }),
    deleteReview: builder.mutation<void, string>({
      query: (productId) => ({
        url: `/products/${productId}/reviews/me`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, productId) => ["Review", { type: "Product", id: productId }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetProductByIdQuery,
  useLoginConfirmMutation,
  useLoginRequestMutation,
  useSignupRequestMutation,
  useSignupConfirmMutation,
  useCreateAddressMutation,
  useDeleteAddressMutation,
  useUpdateAddressMutation,
  useUpdateMeMutation,
  useGetMyOrdersQuery,
  useCreateOrderMutation,
  useCancelOrderMutation,
  useGetProductReviewsQuery,
  useGetReviewEligibilityQuery,
  useSubmitReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  // useGetUserMutation
} = api;
