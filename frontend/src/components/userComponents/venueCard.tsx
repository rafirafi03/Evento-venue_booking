import { MapPin, Users } from "lucide-react";
import Image from "next/image";
import FavouriteButton from "app/(components)/(user)/favouriteButton/page";
import { useRouter } from "next/navigation";


type VenueCardProps = {
  venueId: string;
  userId?: string;
  imageUrl: string;
  title: string;
  city: string;
  state: string;
  capacity: number;
  price: string;
  description: string;
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
}) => {

  const router = useRouter()

  const handleOnClick = (id: string) => {
    router.push(`/venueDetails/${id}`);

  };

  return (
    // <div className="flex bg-white shadow-md rounded-md overflow-hidden w-full max-w-full h-48 relative">
    //     <button
    //     className="absolute top-2 right-2 p-2 bg-red rounded-full hover:bg-gray-100 transition duration-300 ease-in-out"
    //     aria-label="Add to favorites"
    //   >
    //     <Heart className="w-5 h-5 text-gray-500" />
    //   </button>
    //   {/* Left Side: Image */}
    //   <div className="w-1/3">
    //     <img className="w-full h-auto object-cover" src={imageUrl} alt={title} />
    //   </div>

    //   {/* Right Side: Venue Details */}
    //   <div className="w-2/3 p-4 flex flex-col justify-between">
    //     <div className='space-y-2'>
    //       <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    //       <div className="flex items-center text-gray-700 text-xs font-sans font-bold">
    //         <MapPin className="w-4 h-4 mr-1" />
    //         <p>{city}, {state}</p>
    //       </div>
    //       <div className="flex items-center text-gray-700 text-sm font-sans font-semibold">
    //         <Users className="w-4 h-4 mr-1" />
    //         <p>capacity: {capacity}</p>
    //       </div>
    //       <p className="text-gray-800 mt-2 font-medium text-xs">{description}</p>
    //     </div>
    //     <div className="flex justify-between items-center">
    //       <div>
    //         <p className="text-md font-bold">₹ {price} <span className='text-sm'>(per day)</span></p>
    //       </div>
    //       <button
    //         className="bg-[rgb(255,0,0)] hover:bg-red-700 text-white text-xs font-bold py-2.5 px-4 rounded-lg transition duration-300 ease-in-out"
    //         aria-label="Schedule booking for this venue"
    //       >
    //         Schedule Booking
    //       </button>
    //     </div>
    //   </div>
    // </div>

    <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a>
        <Image
          className="rounded-t-lg"
          src={imageUrl}
          alt="img"
          width={500}
          height={500}
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
          <h1 className="font-bold ">₹ {price}</h1>
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
