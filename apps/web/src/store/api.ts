import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
  }),
  tagTypes: ["Product", "Category"],
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
  }),
});

export const { useGetProductsQuery, useGetCategoriesQuery, useGetProductByIdQuery } = api;