import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Category, Product } from "../types/product";
import type { Order } from "../types/order";
import type { User } from "../types/user";

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
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
      transformResponse: (response: { data: Product[] }) => response.data,
    }),
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
      transformResponse: (response: { data: Category[] }) => response.data,
    }),
    getUsers: builder.query<User[], void>({
      query: () => "/users",
      transformResponse: (response: { data: User[] }) => response.data,
    }),
    getOrders: builder.query<Order[], void>({
      query: () => "/orders",
      transformResponse: (response: { data: Order[] }) => response.data,
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
    createProduct: builder.mutation<Product, FormData>({
      query: (formData) => ({
        url: '/products/create',
        method: "POST",
        body: formData
      })
    })
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetProductByIdQuery,
  useSignupRequestMutation,
  useGetOrdersQuery,
  useCreateProductMutation,
  useGetUsersQuery
} = api;
