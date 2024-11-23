import React, { useState } from "react";
import {
  useGetCompaniesQuery,
  useBlockCompanyMutation,
} from "app/store/slices/companyApiSlices";
import ConfirmModal from "../../../../components/common/modals/confirmModal";
import LicenseModal from "../licenseModal/page";
import Pagination from "components/userComponents/pagination";

export default function Page() {
  interface IVerification {
    Pending: "pending";
    Verified: "verified";
    Rejected: "rejected";
  }

  interface ICompany {
    _id: string;
    name: string;
    email: string;
    password: string;
    country: string;
    phone: number;
    license: string;
    isVerified: IVerification;
    isBlocked: boolean;
  }

  const [companyBlock] = useBlockCompanyMutation();
  const {
    data: companies,
    isLoading,
    isError,
    refetch,
  } = useGetCompaniesQuery(undefined);

  console.log(companies, "cmpniesssss");

  const company = companies?.companies?.companies || [];

  const [blockUser, setBlockUser] = useState<string>("");
  const [blockModal, setBlockModal] = useState<boolean>(false);
  const [blockAction, setBlockAction] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [licenseModal, setLicenseModal] = useState<boolean>("");
  const [license, setLicense] = useState<string>("");

  console.log(company);

  const handleBlock = (id: string, isBlocked: boolean) => {
    try {
      setBlockUser(id);
      setBlockModal(true);
      setBlockAction(isBlocked ? "unblock" : "block");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (license: string, _id: string) => {
    setUserId(_id);
    setLicenseModal(true);
    setLicense(license);
  };

  const confirmBlock = async () => {
    try {
      const id = blockUser;
      const res = await companyBlock({ id }).unwrap();

      if (res.success) {
        // toast.success("user blocked");
        refetch();
      } else {
        console.error("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeLicenseModal = () => {
    setLicenseModal(false);
  };

  const closeModal = () => {
    setBlockModal(false);
  };

  const pageChange = () => {
    console.log("hiii");
  };

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching users.</div>;

  return (
    <div className="m-5">
      {licenseModal && (
        <LicenseModal
          license={license ? license : ""}
          closeLicenseModal={closeLicenseModal}
        />
      )}
      <h1 className="font-extrabold text-2xl mt-5 mb-5">Companies</h1>
      {company.length > 0 ? (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-black dark:text-black">
              <thead className="font-bold text-black uppercase bg-red-300 dark:bg-red-300 dark:text-black">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Company
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
                  <th scope="col" className="px-6 py-3">
                    License
                  </th>
                  {/* <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th> */}
                </tr>
              </thead>
              <tbody className="dark:text-black font-bold">
                {company.map((company: ICompany) => (
                  <tr
                    key={company._id}
                    className="bg-red-100 dark:bg-red-100 hover:bg-red-200"
                  >
                    <th scope="row" className="px-6 py-4 whitespace-nowrap">
                      {company.name}
                    </th>
                    <td className="px-6 py-4">{company.email}</td>
                    <td className="px-6 py-4">{company.phone}</td>
                    <td className="px-6 py-4">{company.country}</td>
                    <td className="px-6 py-4">
                      {company.isBlocked ? (
                        <button
                          onClick={() =>
                            handleBlock(company._id, company.isBlocked)
                          }
                          className="bg-[rgb(255,0,0)] hover:bg-black transition-transform duration-300 hover:scale-110 text-white text-xs p-2 rounded-xl h-5 flex items-center"
                        >
                          unblock
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleBlock(company._id, company.isBlocked)
                          }
                          className="bg-black hover:bg-[rgb(255,0,0)] transition-transform duration-300 hover:scale-110 text-white text-xs p-2 rounded-xl h-5 flex items-center"
                        >
                          block
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          handleClick(
                            company.license ? company.license : "",
                            company._id
                          )
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
          <ConfirmModal
            closeModal={closeModal}
            confirmBlock={confirmBlock}
            blockModal={blockModal}
            blockAction={blockAction}
          />
        </>
      ) : (
        <h1>No companies found</h1>
      )}
      <div className="mt-5">
        <Pagination currentPage={1} totalPages={1} onPageChange={pageChange} />
      </div>
    </div>
  );
}
