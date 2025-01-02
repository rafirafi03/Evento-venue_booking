"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faFileAlt,
  faTags,
  faComments,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useLogoutMutation } from "app/store/slices/companyApiSlices";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const [logout] = useLogoutMutation()

  const handleOnClick = (page: string) => {
    if (page === "main") {
      router.push("/company");
    } else {
      router.push(`/company/${page}`);
    }
  };

  const handleLogout = async() => {
    localStorage.removeItem("authCompanyToken");
    await logout({})
    router.replace("/company/login");
  };

  const isActive = (page: string) =>
    pathname === (page === "main" ? "/company" : `/company/${page}`);

  return (
    <div>
      <aside
        id="logo-sidebar"
        className="fixed top-7 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-white shadow-xl"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-white">
          <ul className="space-y-5 ml-2 font-medium">
            <li
              className="cursor-pointer"
              onClick={() => handleOnClick("main")}
            >
              <a
                className={`flex items-center p-2 text-gray-900 rounded-lg font-extrabold hover:bg-gray-100 group ${
                  isActive("main") ? "bg-gray-200" : ""
                }`}
              >
                <FontAwesomeIcon
                  icon={faBuilding}
                  className="flex-shrink-0 w-5 h-5 text-black transition duration-75 group-hover:text-gray-900"
                />
                <span className="ms-3 ml-6">Dashboard</span>
              </a>
            </li>
            <li
              className="cursor-pointer"
              onClick={() => handleOnClick("profile")}
            >
              <a
                className={`flex items-center p-2 text-gray-900 rounded-lg font-extrabold hover:bg-gray-100 group ${
                  isActive("profile") ? "bg-gray-200" : ""
                }`}
              >
                <FontAwesomeIcon
                  icon={faUser}
                  className="flex-shrink-0 w-5 h-5 text-black transition duration-75 group-hover:text-gray-900"
                />
                <span className="ms-3 ml-6">Profile</span>
              </a>
            </li>
            <li
              className="cursor-pointer"
              onClick={() => handleOnClick("venues")}
            >
              <a
                className={`flex items-center p-2 text-gray-900 rounded-lg font-extrabold hover:bg-gray-100 group ${
                  isActive("venues") ? "bg-gray-200" : ""
                }`}
              >
                <FontAwesomeIcon
                  icon={faBuilding}
                  className="flex-shrink-0 w-5 h-5 text-black transition duration-75 group-hover:text-gray-900"
                />
                <span className="flex-1 ms-3 whitespace-nowrap ml-6">Venues</span>
              </a>
            </li>
            <li
              className="cursor-pointer"
              onClick={() => handleOnClick("bookings")}
            >
              <a
                className={`flex items-center p-2 text-gray-900 rounded-lg font-extrabold hover:bg-gray-100 group ${
                  isActive("bookings") ? "bg-gray-200" : ""
                }`}
              >
                <FontAwesomeIcon
                  icon={faFileAlt}
                  className="flex-shrink-0 w-5 h-5 text-black transition duration-75 group-hover:text-gray-900"
                />
                <span className="flex-1 ms-3 whitespace-nowrap ml-6">
                  Bookings
                </span>
              </a>
            </li>
            <li
              className="cursor-pointer"
              onClick={() => handleOnClick("offers")}
            >
              <a
                className={`flex items-center p-2 text-gray-900 rounded-lg font-extrabold hover:bg-gray-100 group ${
                  isActive("offers") ? "bg-gray-200" : ""
                }`}
              >
                <FontAwesomeIcon
                  icon={faTags}
                  className="flex-shrink-0 w-5 h-5 text-black transition duration-75 group-hover:text-gray-900"
                />
                <span className="flex-1 ms-3 whitespace-nowrap ml-6">Offers</span>
              </a>
            </li>
            <li
              className="cursor-pointer"
              onClick={() => handleOnClick("inbox")}
            >
              <a
                className={`flex items-center p-2 text-gray-900 rounded-lg font-extrabold hover:bg-gray-100 group ${
                  isActive("inbox") ? "bg-gray-200" : ""
                }`}
              >
                <FontAwesomeIcon
                  icon={faComments}
                  className="flex-shrink-0 w-5 h-5 text-black transition duration-75 group-hover:text-gray-900"
                />
                <span className="flex-1 ms-3 whitespace-nowrap ml-6">Inbox</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm text-white bg-red-300 rounded-full font-bold">
                  3
                </span>
              </a>
            </li>
            <hr className="my-2 border-gray-300" />
            <li className="cursor-pointer" onClick={handleLogout}>
              <a className="flex items-center p-2 text-gray-900 rounded-lg font-extrabold hover:bg-gray-100 group">
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  className="flex-shrink-0 w-5 h-5 text-black transition duration-75 group-hover:text-gray-900"
                />
                <span className="flex-1 ms-3 whitespace-nowrap ml-6">Log out</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
