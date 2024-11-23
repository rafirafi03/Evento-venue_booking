"use client"

import React, { useState } from "react";
// import Image from "next/image";
// import Header from "../../login-header/header";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faFileAlt, faTags, faComments, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';



export default function page() {

  const router = useRouter()

  const [currPage, setCurrpage] = useState<string>('dashboard')

  const handleOnClick = (page: string)=> {
    setCurrpage(page)
    if(page == 'main') {
      router.push('/company')
    } else {
      router.push(`/company/${page}`)

    }
  }

  const handleLogout = () => {
    localStorage.removeItem("authCompanyToken");
    router.replace("/company/login");
  };

  return (
    <div>
      <aside
        id="logo-sidebar"
        className="fixed top-7 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-white shadow-xl"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-white">
          <ul className="space-y-5 ml-2 font-medium">
            <li className="cursor-pointer" onClick={() =>
                handleOnClick('main')
               }>
              <a className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-black font-extrabold hover:bg-gray-100 dark:hover:bg-gray-100 group ${currPage == 'main' ? 'bg-red-200' : ""}`}>
                <svg
                  className="flex-shrink-0 w-5 h-5 text-black transition duration-75 dark:text-black group-hover:text-gray-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3 ml-6">Dashboard</span>
              </a>
            </li>
            <li className="cursor-pointer" onClick={() => handleOnClick('profile')}>
              <a className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-black font-extrabold hover:bg-gray-100 dark:hover:bg-gray-100 group ${currPage == 'profile' ? 'bg-red-200' : ""}`}>
              <FontAwesomeIcon icon={faUser} className="flex-shrink-0 w-5 h-5 text-black transition duration-75 dark:text-black group-hover:text-gray-900" />

                <span className="ms-3 ml-6">Profile</span>
              </a>
            </li>
            <li className="cursor-pointer" onClick={() => handleOnClick('users')}>
              <a className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-black font-extrabold hover:bg-gray-100 dark:hover:bg-red-200 group ${currPage == 'users' ? 'bg-red-200' : ""}`}>
                <svg
                  className="flex-shrink-0 w-5 h-5 text-black transition duration-75 dark:text-black group-hover:text-gray-900 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap ml-6">
                  Users
                </span>
              </a>
            </li>
            
            <li className="cursor-pointer" onClick={() => handleOnClick('venues')}>
              <a className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-black font-extrabold hover:bg-gray-200 dark:hover:bg-red-200 group ${currPage == 'venues' ? 'bg-red-300' : ""}`}>
              <FontAwesomeIcon icon={faBuilding} className="flex-shrink-0 w-5 h-5 text-black transition duration-75 dark:text-black group-hover:text-gray-900" />

                <span className="flex-1 ms-3 whitespace-nowrap ml-6">
                  Venues
                </span>
              </a>
            </li>
            <li className="cursor-pointer" onClick={() => handleOnClick('bookings')}>
              <a className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-black font-extrabold hover:bg-gray-100 dark:hover:bg-red-200 group ${currPage == 'bookings' ? 'bg-red-300' : ""}`}>
              <FontAwesomeIcon icon={faFileAlt} className="flex-shrink-0 w-5 h-5 text-black transition duration-75 dark:text-black group-hover:text-gray-900" />

                <span className="flex-1 ms-3 whitespace-nowrap ml-6">
                  Bookings
                </span>
              </a>
            </li>
            <li className="cursor-pointer" onClick={() => handleOnClick('offers')}>
              <a className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-black font-extrabold hover:bg-gray-100 dark:hover:bg-red-200 group ${currPage == 'offers' ? 'bg-red-300' : ""}`}>
              <FontAwesomeIcon icon={faTags} className="flex-shrink-0 w-5 h-5 text-black transition duration-75 dark:text-black group-hover:text-gray-900" />

                <span className="flex-1 ms-3 whitespace-nowrap ml-6">
                  Offers
                </span>
              </a>
            </li>
            <li className="cursor-pointer" onClick={() => handleOnClick('inbox')}>
              <a className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-black font-extrabold hover:bg-gray-100 dark:hover:bg-red-200 group ${currPage == 'inbox' ? 'bg-red-300' : ""}`}>
              <FontAwesomeIcon icon={faComments} className="flex-shrink-0 w-5 h-5 text-black transition duration-75 dark:text-black group-hover:text-gray-900" />

                <span className="flex-1 ms-3 whitespace-nowrap ml-6">
                  Inbox
                </span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm text-white bg-red-300 rounded-full font-bold dark:bg-black dark:text-white">
                  3
                </span>
              </a>
            </li>
            <hr className="my-2 border-gray-300 dark:border-gray-200" />
            <li className="cursor-pointer" onClick={handleLogout}>
              <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-black font-extrabold hover:bg-gray-100 dark:hover:bg-red-200 group">
              <FontAwesomeIcon icon={faSignOutAlt} className="flex-shrink-0 w-5 h-5 text-black transition duration-75 dark:text-black group-hover:text-gray-900" />

                <span className="flex-1 ms-3 whitespace-nowrap ml-6">
                  Log out
                </span>
              </a>
            </li>
            
          </ul>
        </div>
      </aside>
    </div>
  );
}
