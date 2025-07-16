import { getBaseUrl } from "@/utils/getBaseUrl ";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ✅ Each product in an order
export interface OrderProduct {
  productId: string;
  quantity: number;
}

// ✅ Main Order interface
export interface Order {
  _id: string;
  orderId: string;
  products: OrderProduct[];
  amount: number;
  email: string;
  status: "pending" | "processing" | "shipped" | "completed" | "failed";
  createdAt: string;
  updatedAt: string;
}

// ✅ API Response Types

export interface GetOrdersByEmailResponse {
  message: string;
  data: Order[];
}

export interface GetOrderByIdResponse {
  message: string;
  data: Order;
}

export interface GetAllOrdersResponse {
  message: string;
  data: Order[];
}

export interface UpdateOrderStatusResponse {
  message: string;
  data: Order;
}

export interface DeleteOrderByIdResponse {
  message: string;
  data: Order;
}

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/orders`,
    credentials: "include",
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    // ✅ get orders by email
    getOrderByEmail: builder.query<GetOrdersByEmailResponse, string>({
      query: (email) => ({
        url: `/${email}`,
      }),
      providesTags: ["Orders"],
    }),

    // ✅ get order by id
    getOrderById: builder.query<GetOrderByIdResponse, string>({
      query: (id) => ({
        url: `/order/${id}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),

    // ✅ get all orders
    getAllOrders: builder.query<GetAllOrdersResponse, void>({
      query: () => ({
        url: `/`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),

    // ✅ update order status
    updateOrderStatus: builder.mutation<
      UpdateOrderStatusResponse,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/update-order-status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Orders"],
    }),

    // ✅ delete order
    deleteOrderById: builder.mutation<DeleteOrderByIdResponse, string>({
      query: (id) => ({
        url: `/delete-order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Orders", id }],
    }),
  }),
});

export const {
  useGetOrderByEmailQuery,
  useGetOrderByIdQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderByIdMutation,
} = orderApi;

export default orderApi;
