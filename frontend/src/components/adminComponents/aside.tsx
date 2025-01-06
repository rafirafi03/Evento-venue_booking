"use client"

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faDashboard,
  faSignOutAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faComment } from '@fortawesome/free-regular-svg-icons';

import { useAdminLogoutMutation } from "app/store/slices/userApiSlices";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function Page() {
  const pathname = usePathname();
  const router = useRouter();
  const [adminLogout] = useAdminLogoutMutation()

  const handleLogout = async() => {
    if(typeof window !== "undefined") {
      localStorage.removeItem("authAdminToken");

    }
    await adminLogout({})
    router.push("/admin/login");
  };

  const isActivePage = (page: string) =>
    pathname === (page === "dashboard" ? "/admin" : `/admin/${page}`);

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
              onClick={() => router.push("/admin")}
            >
              <a
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-black font-extrabold hover:bg-gray-100 dark:hover:bg-gray-100 group ${
                  isActivePage("dashboard") ? "bg-gray-200" : ""
                }`}
              >
                <FontAwesomeIcon
                  icon={faDashboard as IconProp}
                  className="flex-shrink-0 w-5 h-5 text-black transition duration-75 group-hover:text-gray-900"
                />
                <span className="ms-3 ml-6">Dashboard</span>
              </a>
            </li>
            <li
              className="cursor-pointer"
              onClick={() => router.push("/admin/companyList")}
            >
              <a
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-black font-extrabold hover:bg-gray-100 dark:hover:bg-gray-100 group ${
                  isActivePage("companyList") ? "bg-gray-200" : ""
                }`}
              >
                <FontAwesomeIcon
                  icon={faBuilding as IconProp}
                  className="flex-shrink-0 w-5 h-5 text-black transition duration-75 group-hover:text-gray-900"
                />
                <span className="flex-1 ms-3 ml-6 whitespace-nowrap">
                  Companies
                </span>
              </a>
            </li>

            <li
              className="cursor-pointer"
              onClick={() => router.push("/admin/usersList")}
            >
              <a
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-black font-extrabold hover:bg-gray-100 dark:hover:bg-red-200 group ${
                  isActivePage("usersList") ? "bg-gray-200" : ""
                }`}
              >
                <FontAwesomeIcon
                  icon={faUsers as IconProp}
                  className="flex-shrink-0 w-5 h-5 text-black transition duration-75 group-hover:text-gray-900"
                />
                <span className="flex-1 ms-3 whitespace-nowrap ml-6">
                  Users
                </span>
              </a>
            </li>
            <li
              className="cursor-pointer"
              onClick={() => router.push("/admin/approval")}
            >
              <a
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-black font-extrabold hover:bg-gray-100 dark:hover:bg-red-200 group ${
                  isActivePage("approval") ? "bg-gray-200" : ""
                }`}
              >
                <FontAwesomeIcon
                  icon={faComment}
                  className="flex-shrink-0 w-5 h-5 text-black transition duration-75 group-hover:text-gray-900"
                />
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
                <FontAwesomeIcon
                  icon={faSignOutAlt as IconProp}
                  className="flex-shrink-0 w-5 h-5 text-black transition duration-75 group-hover:text-gray-900"
                />
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
