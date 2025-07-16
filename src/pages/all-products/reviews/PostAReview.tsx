
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFetchProductByIdQuery } from "@/redux/features/products/productApi";
import { usePostAReviewMutation } from "@/redux/features/reviews/reviewApi";
import { RippleButton } from "@/components/ui/RippleButton";

const PostAReview = ({ isModalOpen, handleClose }: { isModalOpen: boolean; handleClose: () => void }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const productId = typeof id === "string" ? id : "";
  const { user } = useSelector((state: any) => state.auth); // এই জায়গায় তোমার store এ `auth` slice আছে নিশ্চিত হও

  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { refetch } = useFetchProductByIdQuery(productId, {
    skip: !productId,
  });

  const [postAReview] = usePostAReviewMutation();

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to post a review.");
      navigate("/login");
      return;
    }

    if (rating === 0 || comment.trim() === "") {
      alert("Please provide both rating and comment.");
      return;
    }

    const newReview = {
      comment,
      rating,
      userId: user._id,
      productId,
    };

    try {
      setIsLoading(true);
      await postAReview(newReview).unwrap();
      toast.success("Review posted successfully!");
      setComment("");
      setRating(0);
      setHoverRating(0);
      refetch();
      handleClose();
    } catch (error: any) {
      console.error("❌ Failed to post review:", error?.data?.message || error.message);
      alert("❌ Failed to post review. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isModalOpen) return null;

  return (
    <main className="fixed inset-0 bg-black/90 flex items-center justify-center z-40 px-2">
      <Card className="bg-white p-6 rounded-md shadow-lg w-96 z-50">
        <h2 className="text-lg font-bold dark:text-gray-950">Post a Review</h2>

        {/* Rating Stars */}
        <div className="flex text-xl text-yellow-500 my-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="cursor-pointer transition-all"
            >
              {hoverRating >= star || rating >= star ? <FaStar /> : <FaRegStar />}
            </span>
          ))}
        </div>

        {/* Comment Box */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review here..."
          className="w-full h-32 p-2 border rounded-md dark:bg-gray-600 dark:text-gray-200"
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <RippleButton rippleColor="#ADD8E6" onClick={handleClose} disabled={isLoading}>
            Cancel
          </RippleButton>
          <RippleButton
            rippleColor="#ADD8E6"
            onClick={handleSubmitComment}
            disabled={isLoading || rating === 0 || comment.trim() === ""}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </RippleButton>
        </div>
      </Card>
    </main>
  );
};

export default PostAReview;
