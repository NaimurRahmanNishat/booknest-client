/* eslint-disable @typescript-eslint/no-explicit-any */
import commentImage from "../../../assets/images/avatar.png";
import { useState } from "react";
import PostAReview from "./PostAReview";
import RagingStars from "@/components/shared/RagingStars";

const ReviewCard = ({ reviews }: any) => {
const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenReviewModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="container mx-auto px-2 pb-24">
      <div>
        {reviews.length > 0 ? (
          <div>
            <h3 className="text-lg font-medium">All Comments...</h3>
            <div>
              {reviews.map((review: any, index: number) => (
                <div key={index} className="mt-4">
                  <div className="flex gap-4 items-center">
                    <img
                      src={commentImage}
                      alt="comment-image"
                      className="h-14 w-14 cursor-pointer"
                    />
                    <div className="space-y-1">
                      <p className="text-lg font-medium underline capitalize underline-offset-4 text-blue-400">
                        {review?.userId?.username}
                      </p>
                      <p className="text-[12px] text-gray-600 italic">
                        {new Date(review?.createdAt).toLocaleString()}
                      </p>
                      <RagingStars rating={review?.rating} />
                    </div>
                  </div>
                  {/* comment details */}
                  <div className="text-gray-600 mt-5 border p-8">
                    <p className="md:w-4/5">{review?.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
      {/* add comment section */}
      <div className="mt-12">
        <button
            onClick={handleOpenReviewModal}
          className="px-6 py-3 cursor-pointer hover:bg-slate-700 bg-slate-800 text-white rounded-md flex items-center gap-2"
        >
          <i className="ri-pencil-line mr-2"></i> Add Review
        </button>
      </div>
      {/* post a review model */}
      <PostAReview isModalOpen={isModalOpen} handleClose={handleCloseReviewModal}/>
    </main>
  );
};

export default ReviewCard;
