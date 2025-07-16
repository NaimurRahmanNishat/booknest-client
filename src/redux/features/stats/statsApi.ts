import { getBaseUrl } from "@/utils/getBaseUrl ";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export interface UserStatsResponse {
  totalPayments: number;
  totalReviews: number;
  totalPurchasedProducts: number;
}

export interface MonthlyEarning {
  month: number; 
  year: number;
  earnings: number;
}

export interface AdminStatsResponse {
  totalOrders: number;
  totalProducts: number;
  totalReviews: number;
  totalUsers: number;
  totalEarnings: number;
  monthlyEarnings: MonthlyEarning[];
}

const statsApi = createApi({
  reducerPath: "statsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/stats`,
    credentials: "include",
  }),
  tagTypes: ["Stats"],
  endpoints: (builder) => ({
    getUserStats: builder.query<UserStatsResponse, string>({
      query: (email) => ({
        url: `/user-stats/${email}`,
        method: "GET",
      }),
      providesTags: ["Stats"],
    }),

    getAdminStats: builder.query<AdminStatsResponse, void>({
      query: () => ({
        url: `/admin-stats`,
        method: "GET",
      }),
      providesTags: ["Stats"],
    }),
  }),
});

export const { useGetUserStatsQuery, useGetAdminStatsQuery } = statsApi;

export default statsApi;
