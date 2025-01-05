'use client'

import React, { useState } from "react";
import toast, {Toaster} from 'react-hot-toast'

interface pageProps {
  handleRatingSubmit: (star: number, review: string) => void;
}

export default function RatingCard({ handleRatingSubmit }: pageProps) {
  const [rating, setRating] = useState<number>(1);
  const [review, setReview] = useState<string>("");

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleSubmit = () => {
    const loadingToast = toast.loading('submitting...');
    if (review.trim() == "") {
      toast.dismiss(loadingToast);
      toast.error('empty review field. please fill it!');
      return 
    }
    handleRatingSubmit(rating, review);
    toast.dismiss(loadingToast)
  };

  const renderStar = (starNumber: number) => {
    return (
      <svg
        className={`w-5 h-5 ${
          starNumber <= rating
            ? "text-yellow-300"
            : "text-gray-300 dark:text-gray-500"
        } cursor-pointer`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
        onClick={() => handleStarClick(starNumber)}
      >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
    );
  };

  return (
    <div>
      <Toaster position='bottom-center' reverseOrder={false} />
      <h1 className="text-lg font-bold text-center my-5">Write your Review</h1>

      <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-center my-3">
          {[1, 2, 3, 4, 5].map((starNumber) => (
            <React.Fragment key={starNumber}>
              {renderStar(starNumber)}
            </React.Fragment>
          ))}
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            {rating}
          </p>
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            out of
          </p>
          <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            5
          </p>
        </div>

        <textarea
          id="message"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-red-300 focus:border-red-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-300 dark:focus:border-red-300"
          placeholder="Write your thoughts here..."
        ></textarea>

        <div className="flex justify-center items-center mt-5">
          <button
            onClick={handleSubmit}
            className="bg-red-600 hover:bg-red-700 text-white py-1 px-5 rounded-lg shadow-md transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
