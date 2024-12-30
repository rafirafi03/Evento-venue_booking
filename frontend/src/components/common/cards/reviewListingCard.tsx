import React,{useState} from "react";

import { useGetRatingsQuery } from "app/store/slices/companyApiSlices";
import { FaStar, FaRegStar } from "react-icons/fa";
import Image from "next/image";

interface pageProps {
  venueId: string;
}

export default function ReviewListingCard({ venueId }: pageProps) {
  const { data: ratings } = useGetRatingsQuery(venueId);

  const [showAll, setShowAll] = useState<boolean>(false);

  // Determine the reviews to display
  const reviewsToShow = showAll ? ratings : ratings?.slice(0, 4);

  return (
    <div>
      <h1 className="text-lg font-bold text-center my-5">Reviews</h1>

      {ratings && ratings.length ? (
        <>
        <div className="grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:grid-cols-2 bg-white dark:bg-gray-800">
          {reviewsToShow?.map((rating, index) => (
            <>
              <figure
                key={index}
                className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700"
              >
                <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {rating.star === 1
                      ? "Poor"
                      : rating.star === 2
                      ? "Fair"
                      : rating.star === 3
                      ? "Good"
                      : rating.star === 4
                      ? "Very Good"
                      : rating.star === 5
                      ? "Excellent"
                      : "No Rating"}
                  </h3>
                  <h3 className="flex items-center">
                    {[...Array(5)].map((_, index) =>
                      index < rating.star ? (
                        <FaStar key={index} className="text-yellow-300" />
                      ) : (
                        <FaRegStar key={index} className="text-gray-300" />
                      )
                    )}
                  </h3>
                  <p className="my-4">{rating.review}</p>
                </blockquote>
                <figcaption className="flex items-center justify-center ">
                  <Image
                    className="rounded-full w-9 h-9"
                    src={`https://ui-avatars.com/api/?name=${
                      rating.userName || "User"
                    }&background=random`}
                    alt={`${rating.name || "User"}'s profile picture`}
                    width={500}
                    height={500}
                  />
                  <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                    <div>{rating.userName}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 ">
                      {rating.userEmail}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </>
          ))}
        </div>
        <div className="flex justify-center items-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-red-600 hover:bg-red-700 text-white py-1 px-10 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
              {showAll ? "Show Less" : "Read More"}
            </button>
          </div>

          </>
      ) : (
        <h1 className="text-center my-5 mx-5 text-gray-600">
          no reviews so far
        </h1>
      )}
    </div>
  );
}
