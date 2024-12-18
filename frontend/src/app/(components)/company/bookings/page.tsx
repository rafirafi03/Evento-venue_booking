"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "app/(components)/login-header/header";
import Aside from "app/(components)/company/aside/page";
import { getUserIdFromToken } from "utils/tokenHelper";
import toast, { Toaster } from "react-hot-toast";
import { useGetCompanyBookingsQuery } from "app/store/slices/bookingApiSlices";
import Pagination from "components/userComponents/pagination";
import AuthHOC,{Role} from "components/common/auth/authHoc";

export default function page() {
  const companyId = getUserIdFromToken("authCompanyToken");

  const { data: bookings, error: bookingFetchError, refetch: bookingRefetch } =
    useGetCompanyBookingsQuery(companyId);

    useEffect(() => {
      if (bookingFetchError && "status" in bookingFetchError) {
        if (bookingFetchError.status === 401) {
          console.warn("Session expired. Logging out...");
          localStorage.removeItem("authCompanyToken");
          router.push('/company/login')
        }
      }
    }, [bookingFetchError]);

  const router = useRouter();

  const pageChange = ()=> {
    console.log('hii')
  }

  return (
    <AuthHOC role={Role.Company}>
      <div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-slate-100 shadow-lg">
        <Header />
      </nav>

      <div className="flex mt-[64px]">
        <aside className="w-64 bg-slate-white dark:bg-gray-800">
          <Aside />
        </aside>
        <div className="flex-1 p-4 bg-slate-100 h-screen">
          <div className="m-5">
            <h1 className="font-extrabold text-2xl mt-5">Bookings</h1>

            {bookings?.length > 0 ? (
              <>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
                  <table className="w-full text-sm text-left rtl:text-right text-black dark:text-black">
                    <thead className="font-bold text-black uppercase bg-white dark:bg-white dark:text-black">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          No
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                          guests
                        </th>
                        <th scope="col" className="px-6 py-3">
                          status
                        </th>
                        <th scope="col" className="px-6 py-3">
                          action
                        </th>
                        {/* <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th> */}
                      </tr>
                    </thead>
                    <tbody className="dark:text-black font-bold">
                      {bookings.map((booking, index) => (
                        <tr
                          key={index}
                          className="bg-slate-100 dark:bg-slate-100 hover:bg-slate-200 border-b-2 border"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 whitespace-nowrap"
                          >
                            {index + 1}
                          </th>
                          <th
                            scope="row"
                            className="px-6 py-4 whitespace-nowrap"
                          >
                            {booking.event}
                          </th>
                          <td className="px-6 py-4">{booking.amount}</td>
                          <td className="px-6 py-4">{booking.guests}</td>
                          <td className="px-6 py-4">
                            <button
                              className={`transition-transform duration-300 hover:scale-110 text-xs ${ booking.status == 'confirmed' ? 'bg-success-500' : 'bg-danger-600 '} text-white p-2 rounded-xl h-5 flex items-center`}
                            >
                              {booking.status == 'confirmed' ? 'Confirmed' : 'Cancelled'}
                            </button>
                          </td>
                          {/* <td className="px-6 py-4">
                            {booking.isListed ? (
                              <button
                                onClick={() =>
                                  handleConfirmModal(
                                    "you want to unlist this bookingue?",
                                    "unlist",
                                    booking._id
                                  )
                                }
                                className="bg-gray-500 hover:bg-black transition-transform duration-300 hover:scale-110 text-white text-xs p-2 rounded-xl h-5 flex items-center"
                              >
                                Unlist
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleConfirmModal(
                                    "you want to list this bookingue?",
                                    "list",
                                    booking._id
                                  )
                                }
                                className="bg-black hover:bg-[rgb(255,0,0)] transition-transform duration-300 hover:scale-110 text-white text-xs p-2 rounded-xl h-5 flex items-center"
                              >
                                List
                              </button>
                            )}
                          </td> */}
                          <td className="px-6 py-4">
                            <button
                              onClick={() =>
                                router.push(`/company/bookingDetails/${booking._id}`)
                              }
                              className="bg-black transition-transform duration-300 hover:scale-110 text-xs text-white p-2 rounded-xl h-5 flex items-center"
                            >
                              View
                            </button>
                          </td>
                          {/* <td className="px-6 py-4 text-right">
                    <a className="hover:underline cursor-pointer">View</a>
                  </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* <ConfirmModal closeModal={closeModal} confirmBlock={confirmBlock} blockModal={blockModal} blockAction={blockAction}/> */}
              </>
            ) : (
              <h1>No Bookings found</h1>
            )}
          </div>
          <div className="">
        <Pagination currentPage={1} totalPages={1} onPageChange={pageChange}/>
        </div>
        </div>
      </div>
    </AuthHOC>
  );
}
