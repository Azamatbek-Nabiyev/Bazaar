import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Category, Product } from "../types/product";
import type { Order, OrderStatus } from "../types/order";
import type { User } from "../types/user";
import type { DashboardSummary } from "../types/dashboard";

export type PaginationParams = { page?: number; limit?: number };
export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
};

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
  tagTypes: ["Product", "Category", "User", "Order", "Dashboard"],
  endpoints: (builder) => ({
    getProducts: builder.query<PaginatedResponse<Product>, PaginationParams | void>({
      query: (params) => `/products?page=${params?.page ?? 1}&limit=${params?.limit ?? 10}`,
      providesTags: ["Product"],
    }),
    getCategories: builder.query<PaginatedResponse<Category>, PaginationParams | void>({
      query: (params) => `/categories?page=${params?.page ?? 1}&limit=${params?.limit ?? 10}`,
      providesTags: ["Category"],
    }),
    getUsers: builder.query<PaginatedResponse<User>, PaginationParams | void>({
      query: (params) => `/users?page=${params?.page ?? 1}&limit=${params?.limit ?? 10}`,
      providesTags: ["User"],
    }),
    getOrders: builder.query<PaginatedResponse<Order>, (PaginationParams & { status?: OrderStatus }) | void>({
      query: (params) => {
        const search = new URLSearchParams();
        search.set("page", String(params?.page ?? 1));
        search.set("limit", String(params?.limit ?? 10));
        if (params?.status) search.set("status", params.status);
        return `/orders?${search.toString()}`;
      },
      providesTags: ["Order"],
    }),
    getProductById: builder.query({
      query: (id: string) => `/products/${id}`,
    }),
    getDashboardSummary: builder.query<DashboardSummary, void>({
      query: () => "/dashboard/summary",
      transformResponse: (response: { data: DashboardSummary }) => response.data,
      providesTags: ["Dashboard"],
    }),

    // 👇 auth qismi
    signupRequest: builder.mutation({
      query: (body: { phone: string; fullname: string }) => ({
        url: "/users/signup-request",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<
      { status: string; token: string; user: Pick<User, "_id" | "fullname" | "phone" | "role"> },
      { phone: string; password: string }
    >({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body,
      }),
    }),
    createProduct: builder.mutation<Product, FormData>({
      query: (formData) => ({
        url: '/products/create',
        method: "POST",
        body: formData
      }),
      invalidatesTags: ["Product", "Dashboard"],
    }),
    updateOrderStatus: builder.mutation<Order, { id: string; status: OrderStatus }>({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Order", "Dashboard"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetProductByIdQuery,
  useSignupRequestMutation,
  useLoginMutation,
  useGetOrdersQuery,
  useCreateProductMutation,
  useUpdateOrderStatusMutation,
  useGetUsersQuery,
  useGetDashboardSummaryQuery
} = api;
