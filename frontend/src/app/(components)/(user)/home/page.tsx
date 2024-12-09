"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "components/userComponents/header";
import Footer from "../footer/page";
import { useRouter } from "next/navigation";
import { useGetListedVenuesQuery } from "app/store/slices/companyApiSlices";
// import { useAddToFavouritesMutation } from "app/store/slices/userApiSlices";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { getUserIdFromToken } from "utils/tokenHelper";
import FavouriteButton from "../favouriteButton/page";
// import AuthHOC from "components/common/auth/authHoc";
import Loader from "components/common/loader/loader";
import VenueCard from "components/userComponents/venueCard";

// import Auth from '../../../auth/auth'

const Page = () => {
  const userId = getUserIdFromToken("authUserToken");
  const [loader, setLoader] = useState<boolean>(false);

  const { data: venues, refetch } = useGetListedVenuesQuery(undefined);
  // const [addToFavourites] = useAddToFavouritesMutation()

  const venue = venues?.venues?.venues;

  const router = useRouter();

  if (loader) {
    return <Loader />;
  }

  return (
    <div className="bg-slate-50">
      <Header />
      <div className="flex w-full h-full bg-white border-b border-slate-100 p-5 my-16">
        <div className=" w-1/2 flex items-center justify-center rounded-l-xl p-5 bg-gradient-to-br from-purple-100 via-white to-red-100">
          <div>
            <h1 className="font-georgia font-extrabold text-xl sm:text-md md:text-xl lg:text-2xl mb-5">
              Everything you need to plan your event
            </h1>

            <p className="font-georgia mb-5 sm:text-xs md:text-sm lg:text-md">
              search venues with reviews, pricing and more..
            </p>

            <form className="flex items-center max-w-lg mx-auto">
              <label className="sr-only">Search</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 21C12 21 6 14.6 6 9.5C6 6.186 8.686 3.5 12 3.5C15.314 3.5 18 6.186 18 9.5C18 14.6 12 21 12 21ZM12 11.5C13.1046 11.5 14 10.6046 14 9.5C14 8.39543 13.1046 7.5 12 7.5C10.8954 7.5 10 8.39543 10 9.5C10 10.6046 10.8954 11.5 12 11.5Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="voice-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:placeholder-gray-400 "
                  placeholder="Search venues for your event..."
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-[rgb(255,0,0)] rounded-lg border border-slate-200"
              >
                <svg
                  className="w-4 h-4 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                Search
              </button>
            </form>
          </div>
        </div>
        <div className="w-1/2 h-[45vh] relative">
          <Image
            className="rounded-r-xl"
            src="/assets/images/homepage-image.jpg"
            alt="/assets/images/intrologin-user.jpeg"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto my-5 p-4">
        <h1 className="font-bold font-georgia text-2xl mb-2">
          Featured venues
        </h1>
        <p className="text-sm font-georgia">
          start planning events with us. Explore{" "}
          <span className="text-[rgb(255,0,0)]">Evento</span>
        </p>
      </div>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {venue?.length && (
            <>
              {venue?.map((ven, index) => (
                <VenueCard
                  key={index}
                  title={ven?.name}
                  imageUrl={ven?.images[0]}
                  city={ven?.city}
                  state={ven?.state}
                  capacity={ven?.capacity}
                  description={ven?.description}
                  price={ven?.amount}
                  venueId={ven?._id}
                  userId={userId as string}
                />
              ))}
            </>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center mb-5 mt-5">
        <button
          onClick={() => router.push("/venues")}
          className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-[rgb(255,0,0)] rounded-lg border border-slate-200"
        >
          Show More Venues
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
