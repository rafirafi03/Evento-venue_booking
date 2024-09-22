import React, { useState } from "react";
import { useGetRequestsQuery } from "@/app/store/slices/companyApiSlices";
import ConfirmModal from '../confirmModal/page'

export default function Page() {

  interface ICompany {
    _id: string;
    name: string;
    email: string;
    password: string;
    country: string;
    phone: number;
    isBlocked: boolean;
    isVerified: boolean;
  }

  const { data: requests, isLoading, isError ,refetch} = useGetRequestsQuery(undefined);

  console.log(requests,"reqssss")

  const user = requests?.requests?.requests || [];

  const [blockUser, setBlockUser] = useState<string>("");
  const [blockModal, setBlockModal] = useState<boolean>(false);
  const [blockAction, setBlockAction] = useState<string>("");

  console.log(user);

  const handleBlock = (id: string, isBlocked: boolean) => {

    try {
      setBlockUser(id)
      setBlockModal(true)
      setBlockAction(isBlocked ? "unblock" : "block")

    } catch (error) {
      console.log(error)
    }
    
  }

  const closeModal = ()=> {
    setBlockModal(false)
  }

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching users.</div>;

  return (
    <div className="m-5">
      <h1 className="font-extrabold text-2xl mt-5 mb-5">Requests</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-black dark:text-black">
          <thead className="font-bold text-black uppercase bg-red-300 dark:bg-red-300 dark:text-black">
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
                Country
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
            {user.length > 0 ? (
              user.map((user: ICompany) => (
                <tr
                  key={user._id}
                  className="bg-red-100 dark:bg-red-100 hover:bg-red-200"
                >
                  <th scope="row" className="px-6 py-4 whitespace-nowrap">
                    {user.name}
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">{user.country}</td>
                  <td className="px-6 py-4">
                    <button className="bg-black hover:bg-[rgb(255,0,0)] text-white p-2 rounded-xl h-5 flex items-center">
                      Details
                    </button>                    
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
      <ConfirmModal closeModal={closeModal} id={blockUser} blockModal={blockModal} blockAction={blockAction} refetch={refetch}/>
      
    </div>
  );
}
