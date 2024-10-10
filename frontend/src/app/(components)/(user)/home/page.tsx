"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Header from "../header/page";
import Footer from "../footer/page";
import { useRouter } from "next/navigation";
import { useGetVenuesQuery } from "app/store/slices/companyApiSlices";
// import Auth from '../../../auth/auth'

const Page = () => {
  const { data: venues, refetch } = useGetVenuesQuery(undefined);

  const venue = venues?.venues?.venues;

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <Header />
      <div className="flex w-full bg-white border-b border-slate-100">
        <div className="bg-slate-100 w-1/2 flex items-center justify-center">
          <div>
            <h1 className="font-georgia font-extrabold text-2xl mb-5 mt-16">
              Everything you need to plan your event
            </h1>
            <p className="font-georgia mb-5">
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
            src="/assets/images/homepage-image.jpg"
            alt="/assets/images/intrologin-user.jpeg"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      <h1 className="">Featured venues</h1>
      <div className="flex justify-center items-center mb-5">
        {venue?.length && (
          <>
            {venue.map((ven, index) => (
              <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img
                    className="rounded-t-lg max-w-xs max-h-min"
                    src={ven.images[0]}
                    alt=""
                  />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                      Noteworthy technology acquisitions 2021
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-xs text-gray-700 dark:text-gray-400">
                    Here are the biggest enterprise technology acquisitions of
                    2021 so far, in reverse chronological order.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Read more
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </>
        )}

      </div>
      <div className="flex items-center justify-center mb-5">
            <button
                type="submit"
                className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-[rgb(255,0,0)] rounded-lg border border-slate-200"
              >
                Show More
              </button>

      </div>
      <Footer />
    </>
  );
};

export default Page;
