"use client";
import React, { useEffect, useState } from "react";
import {
  useGetCompaniesQuery,
  useBlockCompanyMutation,
} from "app/store/slices/companyApiSlices";
import ConfirmModal from "../../../../components/common/modals/confirmModal";
import LicenseModal from "../licenseModal/page";
import Pagination from "components/userComponents/pagination";
import Header from "app/(components)/login-header/header";
import Aside from "components/adminComponents/aside";
import AuthHOC, { Role } from "components/common/auth/authHoc";
import { useRouter } from "next/navigation";
import { isApiError } from "utils/errors";

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

  const router = useRouter();

  const [companyBlock] = useBlockCompanyMutation();

  const [blockUser, setBlockUser] = useState<string>("");
  const [blockModal, setBlockModal] = useState<boolean>(false);
  const [blockAction, setBlockAction] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [licenseModal, setLicenseModal] = useState<boolean>(false);
  const [license, setLicense] = useState<string>("");
  const [companiesArray, setCompaniesArray] = useState<ICompany[]>([]);

  console.log(userId);

  const {
    data: companies,
    isLoading,
    error: companiesFetchError,
  } = useGetCompaniesQuery(undefined);

  useEffect(() => {
    if (companiesFetchError && "status" in companiesFetchError) {
      if (companiesFetchError.status === 401) {
        console.warn("Session expired. Logging out...");
        localStorage.removeItem("authAdminToken");
        router.push("/admin/login");
      }
    }
  }, [companiesFetchError, router]);

  useEffect(() => {
    // Initial fetch for companies
    const fetchCompanies = async () => {
      const company = companies?.companies?.companies || []; // Assume this fetches the company data
      setCompaniesArray(company);
    };
    fetchCompanies();
  }, [companies?.companies?.companies]);

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
        setCompaniesArray((prev) =>
          prev.map((company) =>
            company._id === id
              ? {
                  ...company,
                  isBlocked: blockAction === "unblock" ? false : true,
                }
              : company
          )
        );
      } else {
        console.error("Something went wrong");
      }
    } catch (error: unknown) {
      if (isApiError(error) && error.status === 401) {
        localStorage.removeItem("authCompanyToken");
        router.push("/company/login");
      } else {
        console.error("An unexpected error occurred", error);
      }
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

  return (
    <AuthHOC role={Role.Admin}>
      <div>
        {licenseModal && (
          <LicenseModal
            license={license ? license : ""}
            closeLicenseModal={closeLicenseModal}
          />
        )}
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-slate-100 shadow-lg">
          <Header />
        </nav>
        <div className="flex mt-[64px]">
          <aside className="w-64 bg-white dark:bg-gray-800">
            <Aside />
          </aside>
          <div className="flex-1 p-4 mx-5">
            <h1 className="font-extrabold text-2xl mt-5 mb-5">Companies</h1>
            {companiesArray.length > 0 ? (
              <>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-black dark:text-black">
                    <thead className="font-bold text-black uppercase bg-gray-200 dark:bg-gray-200 dark:text-black">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          No
                        </th>
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
                      {companiesArray.map((company: ICompany, index: number) => (
                        <tr
                          key={company._id}
                          className="bg-gray-100 dark:bg-gray-100 hover:bg-gray-200"
                        >
                          <th className="px-6 py-4">{index+1}</th>
                          <td
                            scope="row"
                            className="px-6 py-4 whitespace-nowrap"
                          >
                            {company.name}
                          </td>
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
              <Pagination
                currentPage={1}
                totalPages={1}
                onPageChange={pageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthHOC>
  );
}
