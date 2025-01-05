import { MapPin, Users } from "lucide-react";
import Image from "next/image";
import FavouriteButton from "components/userComponents/favouriteButton/page";
import { useRouter } from "next/navigation";
import { useState } from "react";

type VenueCardProps = {
  venueId: string;
  userId?: string;
  imageUrl: string;
  title: string;
  city: string;
  state: string;
  capacity: number;
  price: number;
  description: string;
  offerPrice?: number;
  offerPercentage?: number;
};

const VenueCard: React.FC<VenueCardProps> = ({
  venueId,
  userId,
  imageUrl,
  title,
  city,
  state,
  capacity,
  price,
  description,
  offerPrice,
  offerPercentage,
}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleOnClick = (id: string) => {
    router.push(`/venueDetails/${id}`);
  };

  return (
    <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a>
        <Image
          className={`rounded-t-lg transition-opacity duration-300 ${
            isLoading
              ? "animate-spin rounded-full text-center m-auto my-6 h-8 w-8 border-b-2 border-gray-900"
              : "opacity-100"
          }`}
          src={imageUrl}
          alt="img"
          width={500}
          height={500}
          onLoadingComplete={() => setIsLoading(false)}
        />
      </a>
      <div className="p-5">
        <a className="flex justify-between items-center">
          <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <FavouriteButton userId={userId as string} venueId={venueId} />
        </a>
        <a>
          <h5 className="flex mb-2 text-xs tracking-tight text-gray-900 dark:text-white">
            <MapPin className="w-4 h-4 mr-1" />
            {city}, {state}
          </h5>
        </a>
        <a>
          <h5 className="flex mb-2 text-xs tracking-tight text-gray-900 dark:text-white">
            <Users className="w-4 h-4 mr-1" />
            {capacity}
          </h5>
        </a>
        <p className="mb-3 font-normal text-xs text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <h1 className="font-bold">
            {offerPrice ? (
              <div>
                <span className="text-xs text-white bg-green-500 rounded-md px-1 py-1">
                  {offerPercentage}% off
                </span>
                <span className="text-xs text-red-500 line-through block">
                  ₹ {price}
                </span>
                <span className="text-green-500 text-lg">₹ {offerPrice}</span>
              </div>
            ) : (
              <span>₹ {price}</span>
            )}
          </h1>
          <a
            onClick={() => handleOnClick(venueId)}
            className="inline-flex items-center cursor-pointer px-3 py-2 text-sm font-medium text-center text-white bg-[rgb(255,0,0)] rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-700"
          >
            View Details
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
