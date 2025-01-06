"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useUserLogoutMutation } from "app/store/slices/userApiSlices";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname(); // Get the current pathname
  const [userLogout] = useUserLogoutMutation();

  const [isToken, setToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authUserToken");
    if (token) {
      setToken(true);
    }
  }, []);

  const handleOnClick = (method: string) => {
    if (method == "login") {
      router.push("/login");
    }
  };

  const handleLogout = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("authUserToken");
    }
    await userLogout({});
    setToken(false);
    router.push("/login");
  };

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image
              src="/assets/images/evento-logo.png"
              alt="evento logo"
              width={30}
              height={30}
              className="self-center "
            />
            <span
              style={{ color: "rgba(255, 0, 0, 1)" }}
              className="self-center text-3xl font-bold font-georgia ml-3"
            >
              Evento
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {isToken ? (
              <>
                <p
                  onClick={() => router.push("/profile")}
                  className="text-black cursor-pointer focus:ring-4 focus:outline-none font-bold rounded-full text-base px-3 py-2 text-center hover:text-[rgb(255,0,0)]"
                >
                  Profile
                </p>
                <p
                  onClick={handleLogout}
                  className="text-black cursor-pointer focus:ring-4 focus:outline-none font-bold rounded-full text-base px-3 py-2 text-center hover:text-[rgb(255,0,0)]"
                >
                  logout
                </p>
              </>
            ) : (
              <>
                <p
                  onClick={() => router.push("/company/login")}
                  className="text-black cursor-pointer focus:ring-4 focus:outline-none font-bold rounded-full text-base px-3 py-2 text-center hover:text-[rgb(255,0,0)]"
                >
                  Company
                </p>
                <p
                  onClick={() => handleOnClick("login")}
                  className="text-black cursor-pointer focus:ring-4 focus:outline-none font-bold rounded-full text-base px-3 py-2 text-center hover:text-[rgb(255,0,0)]"
                >
                  Login
                </p>
              </>
            )}
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:border-gray-700">
              <li>
                <a
                  onClick={() => router.push("/")}
                  style={{
                    color: isActive("/") ? "rgba(255, 0, 0, 1)" : "black",
                  }}
                  className="block py-2 px-3 font-bold text-black rounded md:bg-transparent md:p-0 md:dark:text-blue-500 cursor-pointer"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  onClick={() => router.push("/venues")}
                  style={{
                    color: isActive("/venues") ? "rgba(255, 0, 0, 1)" : "black",
                  }}
                  className="block py-2 px-3 font-bold text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-500 md:p-0 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer"
                >
                  Venues
                </a>
              </li>
              <li>
                <a className="block py-2 px-3 font-bold text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-500 md:p-0 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
