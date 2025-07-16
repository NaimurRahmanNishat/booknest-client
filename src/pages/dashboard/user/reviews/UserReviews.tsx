/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/shared/Loading";
import { useGetReviewsByUserIdQuery, type Review } from "@/redux/features/reviews/reviewApi";

const UserReviews: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetReviewsByUserIdQuery<any>(user?._id, {
    skip: !user?._id,
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Failed to fetch data</div>;

  const reviews: Review[] = data?.data || [];

  const handleCardClick = () => {
    navigate("/all-products");
  };

  return (
    <div className="pt-24">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Your Given Reviews</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review._id}
                className="bg-background shadow-md rounded-lg p-4 border border-gray-200 cursor-pointer hover:scale-105 transition-all duration-200"
              >
                <p className="text-lg font-semibold mb-2">
                  Rating: {review.rating}
                </p>
                <p className="mb-2">
                  <strong>Comment:</strong> {review.comment}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Product ID:</strong> {review.productId}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Created At:</strong>{" "}
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p>No reviews yet!</p>
          )}
          <div
            className="bg-gray-100 text-black flex items-center justify-center rounded-lg p-6 border border-gray-200 cursor-pointer hover:bg-primary hover:text-white transition-all duration-200"
            onClick={handleCardClick}
          >
            <span className="text-3xl font-bold">+</span>
            <p className="ml-2 text-lg">Add New Review</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReviews;
