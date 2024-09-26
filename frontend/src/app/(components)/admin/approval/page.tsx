import React, { useState } from "react";
import { useCompanyApprovalMutation, useGetRequestsQuery } from "@/app/store/slices/companyApiSlices";
import Modal from '../modal/page'

export default function Page() {

  interface IVerification {
    Pending: "pending",
    Verified: 'verified',
    Rejected: 'rejected'
  }

  interface ICompany {
    _id: string;
    name: string;
    email: string;
    password: string;
    country: string;
    phone: number;
    license?: string;
    isBlocked: boolean;
    isVerified: IVerification;
  }

  const { data: requests, isLoading, isError } = useGetRequestsQuery(undefined);
  const [setApproval] = useCompanyApprovalMutation()

  const [isModal, setModal] = useState<boolean>(false);
  const [license, setLicense] = useState('')
  const [userId, setUserId] = useState('')

  console.log(requests, "reqssss");

  const user = requests?.requests?.requests || [];

  console.log(user);

  const handleClick = (license:string,_id:string) => {
    console.log("handleclick");
    setUserId(_id)
    setModal(true);
    setLicense(license)
    console.log(isModal);
  };

  const closeModal = () => {
    setModal(false)
  }

  const handleApproval = async (arg: string)=> {
    try {
      console.log('hi guysssss')
      const approval = arg;

      console.log(approval, userId,"aprvl useridddddd")
      const res = await setApproval({approval, userId}).unwrap()

      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  // const closeModal = ()=> {
  //   setBlockModal(false)
  // }

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching users.</div>;

  return (
      
      <div className="m-5">
        <h1 className="font-extrabold text-2xl mt-5 mb-5">Requests</h1>
      {user.length > 0 ? (
        <>
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
                  License
                </th>
                {/* <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th> */}
              </tr>
            </thead>
            <tbody className="dark:text-black font-bold">
              
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
                      <button
                        onClick={()=>handleClick(user.license?user.license:"",user._id)}
                        data-modal-target="default-modal"
                        data-modal-toggle="default-modal"
                        className="bg-black hover:bg-[rgb(255,0,0)] text-white p-2 rounded-xl h-5 flex items-center"
                      >
                        View
                      </button>
                    </td>
                    {/* <td className="px-6 py-4 text-right">
                    <a className="hover:underline cursor-pointer">View</a>
                  </td> */}
                  </tr>
                ))
              
            </tbody>
          </table>
        </div>
        {isModal && (
        <Modal license={license?license:""} handleApproval={handleApproval} closeModal={closeModal}/>
      )}
      </>

    ) : (
      <div className="flex items-center justify-center">
        <h1 >No Requests found</h1>  

      </div>

    )}
      </div>

      
  );
}
