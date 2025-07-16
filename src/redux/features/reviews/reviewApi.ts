import { getBaseUrl } from "@/utils/getBaseUrl ";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ✅ Review type define
export interface Review {
  [x: string]: string | number | undefined;
  _id: string;
  comment: string;
  rating: number;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
}

// ✅ CreateReviewPayload type define
interface CreateReviewPayload {
  userId: string;
  productId: string;
  rating: number;
  comment: string;
}

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/reviews`,
    credentials: "include",
  }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    // ✅ Review create endpoint
    postAReview: builder.mutation<Review, CreateReviewPayload>({
      query: (reviewData) => ({
        url: "/post-review",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: (_result, _error, {productId: postId})=>[{type: "Reviews", id: postId}],
    }),

    // ✅ total reviews count
    getReviewsCount: builder.query<number, void>({
      query: () => ({
        url: "/total-reviews",
        method: "GET",
      }),
    }),

    // ✅ userId get all reviews
    getReviewsByUserId: builder.query<Review[], string>({
      query: (userId) => ({
        url: `/${userId}`,
      }),
      providesTags: (result) => result ? [{type: "Reviews", id: result[0]?.email}] : []
    }),
  }),
});

// ✅ export hooks
export const { usePostAReviewMutation, useGetReviewsCountQuery, useGetReviewsByUserIdQuery } = reviewApi;

export default reviewApi;
