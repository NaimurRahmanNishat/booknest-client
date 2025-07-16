/* eslint-disable @typescript-eslint/no-explicit-any */
import { getBaseUrl } from "@/utils/getBaseUrl ";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  _id: string;
  name: string;
  writer: string;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  author: {
    _id: string;
    username: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface ProductsResponse {
  products: Product[];
  totalProducts: number;
  totalPage: number;
}

interface FetchAllProductsParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
}

interface SingleProductResponse {
  product: Product;
  reviews: any[];
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/products`,
    credentials: "include",
  }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    // ✅ Get all products
    fetchAllProducts: builder.query<ProductsResponse, FetchAllProductsParams>({
      query: ({
        category,
        minPrice,
        maxPrice,
        page = "1",
        limit = "12",
        sort = "",
        search,
      }) => {
        const queryParams = new URLSearchParams();
        if (category) queryParams.append("category", category);
        if (minPrice !== undefined)
          queryParams.append("minPrice", minPrice.toString());
        if (maxPrice !== undefined)
          queryParams.append("maxPrice", maxPrice.toString());
        if (page) queryParams.append("page", page.toString());
        if (limit) queryParams.append("limit", limit.toString());
        if (sort) queryParams.append("sort", sort);
        if (search) queryParams.append("search", search);
        return `/?${queryParams.toString()}`;
      },
      providesTags: ["products"],
    }),

    // ✅ Get single product by id
    fetchProductById: builder.query<SingleProductResponse, string>({
      query: (id) => `/${id}`,
      providesTags: (_result, _error, id) => [{ type: "products", id }],
    }),

    // ✅ Get category featured products
    getCategoryFeaturedProducts: builder.query<any, void>({
      query: () => `/category`,
    }),

    // ✅ create add product
    AddProduct: builder.mutation<Product, FormData>({
      query: (newProduct) => ({
        url: "/create-product", // ✅ Fixed endpoint
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["products"],
    }),

    // ✅ Update product
    updateProduct: builder.mutation<Product, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/update-product/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),

    // ✅ Delete product
    deleteProduct: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "products", id }],
    }),
  }),
});

export const {
  useFetchAllProductsQuery,
  useFetchProductByIdQuery,
  useAddProductMutation,
  useGetCategoryFeaturedProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;

export default productsApi;
