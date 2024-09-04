import React, { useState } from "react";
import { useGetUsersQuery } from "@/app/store/slices/userApiSlices";

export default function Page() {
  const { data: users, isLoading, isError } = useGetUsersQuery(undefined);

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching users.</div>;

  return (
    <div className="m-5">
      <h1 className="font-extrabold text-2xl mt-5 mb-5">Users</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="font-bold text-gray-700 uppercase bg-gray-50 dark:bg-red-300 dark:text-black">
            <tr>
              <th scope="col" className="px-6 py-3">User</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Phone</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="dark:text-black font-bold">
            {users.users.length > 0 ? (
              users.users.map((user:any) => (
                <tr key={user._id} className="bg-white dark:bg-red-100 hover:bg-red-200">
                  <th scope="row" className="px-6 py-4 whitespace-nowrap">
                    {user.userName}
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">
                    <button className="bg-[rgb(255,0,0)] text-white p-2 rounded-xl h-5 flex items-center">
                      block
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a className="hover:underline">Edit</a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center px-6 py-4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
