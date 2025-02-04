"use client";

import React, { useState, useEffect } from "react";
import {
  useBlockUserMutation,
  useGetUsersQuery,
} from "app/store/slices/userApiSlices";
import ConfirmModal from "../../../../components/common/modals/confirmModal";
import Pagination from "components/userComponents/pagination";
import Header from "components/common/login-header/header";
import Aside from "components/adminComponents/aside";
import AuthHOC, { Role } from "components/common/auth/authHoc";
import { useRouter } from "next/navigation";
import { isApiError } from "utils/errors";
import fetchErrorCheck from "utils/fetchErrorCheck";

export default function Page() {
  interface IUser {
    _id: string;
    userName: string;
    email: string;
    password: string;
    phone: number;
    isBlocked: boolean;
  }

  const router = useRouter();

  const [userBlock] = useBlockUserMutation();
  const {
    data: users,
    isLoading,
    error: usersFetchError,
  } = useGetUsersQuery(undefined);

  useEffect(() => {
    const isError = fetchErrorCheck({ fetchError: usersFetchError, role: "admin" });

    if(isError) {
      router.push('/admin/login')
    }
    
  }, [usersFetchError, router]);

  const [usersArray, setUsersArray] = useState<IUser[]>([]);

  useEffect(() => {
    // Initial fetch for companies
    const fetchUsers = async () => {
      const user = users?.users?.users || [];
      setUsersArray(user);
    };
    fetchUsers();
  }, [users?.users?.users]);

  const [blockUser, setBlockUser] = useState<string>("");
  const [blockModal, setBlockModal] = useState<boolean>(false);
  const [blockAction, setBlockAction] = useState<string>("");

  const handleBlock = (id: string, isBlocked: boolean) => {
    try {
      setBlockUser(id);
      setBlockModal(true);
      setBlockAction(isBlocked ? "unblock" : "block");
    } catch (error) {
      console.log(error);
    }
  };

  const confirmBlock = async () => {
    try {
      const id = blockUser;
      const res = await userBlock({ id }).unwrap();

      if (res.success) {
        // toast.success("user blocked");
        setUsersArray((prev) =>
          prev?.map((user) =>
            user._id === id
              ? { ...user, isBlocked: blockAction === "unblock" ? false : true }
              : user
          )
        );
      } else {
        console.error("something went wrong");
      }
    } catch (error: unknown) {
      if (isApiError(error) && error.status === 401) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("authAdminToken");
        }
        router.push("/admin/login");
      } else {
        console.error("An unexpected error occurred", error);
      }
    }
  };

  const closeModal = () => {
    setBlockModal(false);
  };

  const pageChange = () => {
    console.log("giii");
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <AuthHOC role={Role.Admin}>
      <div>
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-slate-100 shadow-lg">
          <Header />
        </nav>
        <div className="flex mt-[64px]">
          <aside className="w-64 bg-white dark:bg-gray-800">
            <Aside />
          </aside>
          <div className="flex-1 p-4 mx-5">
            <h1 className="font-extrabold text-2xl mt-5 mb-5">Users</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-center rtl:text-right text-black dark:text-black">
                <thead className="font-bold text-black uppercase bg-gray-200 dark:bg-gray-200 dark:text-black">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      User
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phone
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    {/* <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th> */}
                  </tr>
                </thead>
                <tbody className="dark:text-black font-bold">
                  {usersArray.length > 0 ? (
                    usersArray.map((user: IUser) => (
                      <tr
                        key={user._id}
                        className="bg-gray-100 dark:bg-gray-100 hover:bg-gray-200"
                      >
                        <th scope="row" className="px-6 py-4 whitespace-nowrap">
                          {user.userName}
                        </th>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">{user.phone}</td>
                        <td className="px-6 py-4">
                          {user.isBlocked ? (
                            <button
                              onClick={() =>
                                handleBlock(user._id, user.isBlocked)
                              }
                              className="bg-[rgb(255,0,0)] hover:bg-black text-white text-xs px-2.5 py-1 rounded-xl"
                            >
                              unblock
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                handleBlock(user._id, user.isBlocked)
                              }
                              className="bg-black hover:bg-[rgb(255,0,0)] text-white text-xs px-2.5 py-1 rounded-xl"
                            >
                              block
                            </button>
                          )}
                        </td>
                        {/* <td className="px-6 py-4 text-right">
                    <a className="hover:underline cursor-pointer">View</a>
                  </td> */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center px-6 py-4">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-5">
              <Pagination
                currentPage={1}
                totalPages={1}
                onPageChange={pageChange}
              />
            </div>
            <ConfirmModal
              closeModal={closeModal}
              confirmBlock={confirmBlock}
              blockModal={blockModal}
              blockAction={blockAction}
            />
          </div>
        </div>
      </div>
    </AuthHOC>
  );
}
