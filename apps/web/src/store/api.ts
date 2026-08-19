import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  tagTypes: ["Product", "Category", "User"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
    }),
    getCategories: builder.query({
      query: () => "/categories",
    }),
    getProductById: builder.query({
      query: (id: string) => `/products/${id}`,
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

  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetProductByIdQuery,
  useLoginConfirmMutation,
  useLoginRequestMutation,
  useSignupRequestMutation,
  useSignupConfirmMutation
} = api;