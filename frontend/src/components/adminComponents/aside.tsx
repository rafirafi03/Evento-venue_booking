import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Header from "../../login-header/header";

export default function page() {
  const [page, setPage] = useState<string>("");
  const router = useRouter();

  const changePage = (arg: string) => {
    setPage(arg);
    if(arg === 'dashboard') {
        router.push('/admin')
    } else {
        router.push(`/admin/${arg}`)
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authAdminToken");
    router.push('/admin/login')
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
            <li
              className="cursor-pointer"
              onClick={() => {
                 changePage("dashboard")
                }}
            >
              <a
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-black font-extrabold hover:bg-gray-100 dark:hover:bg-gray-100 group ${
                  page == "dashboard" ? "bg-red-300" : ""
                }`}
              >
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
            <li
              className="cursor-pointer"
              onClick={() => {
                changePage("companyList");
              }}
            >
              <a
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-black font-extrabold hover:bg-gray-100 dark:hover:bg-gray-100 group ${
                  page == "companyList" ? "bg-red-300" : ""
                }`}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-black transition duration-75 dark:text-black group-hover:text-gray-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className="flex-1 ms-3 ml-6 whitespace-nowrap">
                  Companies
                </span>
              </a>
            </li>

            <li
              className="cursor-pointer"
              onClick={() => {
                changePage("usersList");
              }}
            >
              <a
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-black font-extrabold hover:bg-gray-100 dark:hover:bg-red-200 group ${
                  page == "usersList" ? "bg-red-300" : ""
                }`}
              >
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
            <li 
            className="cursor-pointer" 
            onClick={() => { 
                changePage("approval");
            }}>
              <a
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-black font-extrabold hover:bg-gray-100 dark:hover:bg-red-200 group ${
                  page == "approval" ? "bg-red-300" : ""
                }`}
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-black transition duration-75 dark:text-black group-hover:text-gray-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
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
                <svg
                  className="flex-shrink-0 w-5 h-5 text-black transition duration-75 dark:text-black group-hover:text-gray-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
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
