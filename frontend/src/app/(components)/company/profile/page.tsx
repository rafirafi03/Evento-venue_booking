"use client";

import React, { useEffect, useState } from "react";
import {
  Building,
  Save,
  Mail,
  Phone,
} from "lucide-react";
import Header from "app/(components)/login-header/header";
import Aside from "app/(components)/company/aside/page";
import { getUserIdFromToken } from "utils/tokenHelper";
import { useGetCompanyDetailsQuery, useEditCompanyProfileMutation } from "app/store/slices/companyApiSlices";
import Image from "next/image";
import AuthHOC,{Role} from "components/common/auth/authHoc";
import { useRouter } from "next/navigation";
import { isApiError } from "utils/errors";


export default function Page() {

  const router = useRouter()

  const [activeTab, setActiveTab] = useState("info");

  const companyId = getUserIdFromToken("authCompanyToken");

  const [editCompanyProfile] = useEditCompanyProfileMutation()

  const {
    data: company,
    error: companyFetchError,
    refetch,
  } = useGetCompanyDetailsQuery(companyId);

   useEffect(() => {
          if (companyFetchError && "status" in companyFetchError) {
            if (companyFetchError.status === 401) {
              console.warn("Session expired. Logging out...");
              localStorage.removeItem("authCompanyToken");
              router.push('/company/login')
            }
          }
        }, [companyFetchError, router]);

  const [isEdit, setIsEdit] = useState<boolean>(false);

  console.log(company);

  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<number>(0)
  const [initialName, setInitialName] = useState<string>('');
  const [initialPhone, setInitialPhone] = useState<number>(0)

  useEffect(() => {
    setName(company?.name)
    setPhone(company?.phone);
    setInitialName(company?.name)
    setInitialPhone(company?.phone)
  },[company])

  const handleUpdateProfile = async()=> {
    try {
      if(initialName == name && initialPhone == phone) {
        return null
      } 
      const response = await editCompanyProfile({companyId, name, phone}).unwrap()

      console.log(response)
      refetch()
      setIsEdit(false)
    } catch (error: unknown) {
      if (isApiError(error) && error.status === 401) {
        localStorage.removeItem("authCompanyToken");
        router.push("/company/login");
      } else {
        console.error("An unexpected error occurred", error);
      }
    }
  }


  return (
    <AuthHOC role={Role.Company}>
    <div className="bg-gray-100 h-full">
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-slate-100 shadow-lg">
        <Header />
      </nav>
      <div className="flex mt-[64px]">
        <aside className="w-64 bg-slate-white dark:bg-gray-800">
          <Aside/>
        </aside>
        <div className="flex-1 p-5 bg-slate-100 my-3">
          <h1 className="font-extrabold text-2xl my-3">Profile</h1>
          <div className="min-h-screen bg-white shadow-lg rounded-lg">
            <div className="container mx-auto px-4 py-8 font-sans">
              <div className="mb-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="relative h-20 w-20">
                    <Image
                      alt="Company logo"
                      className="rounded-full object-cover"
                      height="80"
                      src="/assets/images/homepage-image.jpg"
                      style={{
                        aspectRatio: "80/80",
                        objectFit: "cover",
                      }}
                      width="80"
                    />
                    {/* <button
              className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-red-500 p-0 text-white hover:bg-red-600"
              aria-label="Change company logo"
            >
              <Camera className="h-3 w-3" />
            </button> */}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">{company?.name}</h1>
                    <p className="text-sm text-gray-500">Event company</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEdit(true)}
                  className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                  <Building className="mr-2 inline-block h-4 w-4" />
                  Update Profile
                </button>
              </div>
              <div className="space-y-4">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {["info", "contact", "license"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                          activeTab === tab
                            ? "border-red-500 text-red-600"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </nav>
                </div>
                <div className="mt-4">
                  {activeTab === "info" && (
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                      <h2 className="mb-4 text-lg font-semibold">
                        Company Information
                      </h2>
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="company-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Company Name
                          </label>
                          {isEdit ? (
                            <input
                              type="text"
                              id="company-name"
                              value={name}
                              onChange={(e)=> setName(e.target.value)}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                              placeholder="Acme Corporation"
                            />
                          ) : (
                            <div className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm bg-gray-200 text-gray-700">
                              {company?.name || "Acme Corporation"}
                            </div>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="industry"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          {isEdit ? (
                            <input
                              type="text"
                              id="company-name"
                              value={company?.email}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                              placeholder="Acme Corporation"
                              disabled
                            />
                          ) : (
                            <div className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm bg-gray-200 text-gray-700">
                              {company?.email || "Acme Corporation"}
                            </div>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="founded"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Phone
                          </label>
                          {isEdit ? (
                            <input
                              type="tel"
                              id="company-phone"
                              value={phone}
                              onChange={(e)=> setPhone(Number(e.target.value))}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                              placeholder="Acme Corporation"
                            />
                          ) : (
                            <div className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm bg-gray-200 text-gray-700">
                              {company?.phone}
                            </div>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Country
                          </label>
                          {isEdit ? (
                            <input
                              type="tel"
                              id="company-phone"
                              value={company?.country}
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                              placeholder="Acme Corporation"
                              disabled
                            />
                          ) : (
                            <div className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm bg-gray-200 text-gray-700">
                              {company?.country}
                            </div>
                          )}
                        </div>
                        {isEdit && (
                          <div className="flex justify-center">
                          <button
                            onClick={handleUpdateProfile}
                            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                          >
                            <Save className="mr-2 inline-block h-4 w-4" />
                            Save Edit
                          </button>
                        </div>
                        )}
                        
                      </div>
                    </div>
                  )}
                  {activeTab === "contact" && (
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                      <h2 className="mb-4 text-lg font-semibold">
                        Contact Information
                      </h2>
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500">
                              <Mail className="h-4 w-4" />
                            </span>
                            <div
                              id="email"
                              className="block w-full flex-1 rounded-none rounded-r-md border border-gray-300 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 bg-gray-100"
                            >
                              {company?.email}
                            </div>
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Phone
                          </label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500">
                              <Phone className="h-4 w-4" />
                            </span>
                            <div
                              id="phone"
                              className="block w-full flex-1 rounded-none rounded-r-md border border-gray-300 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 bg-gray-100"
                            >
                              {company?.phone}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === "license" && (
                    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                      <div className="flex items-center h-52 w-52 my-5">
                        <Image
                          src={company?.license}
                          layout="responsive"
                          alt=""
                          width={50}
                          height={50}
                          className="object-cover"
                        />
                      </div>
                      {/* <h2 className="mb-4 text-lg font-semibold">
                        Team Members
                      </h2>
                      <div className="space-y-4">
                        {[
                          {
                            name: "John Doe",
                            role: "CEO",
                            email: "john@acmecorp.com",
                          },
                          {
                            name: "Jane Smith",
                            role: "CTO",
                            email: "jane@acmecorp.com",
                          },
                          {
                            name: "Mike Johnson",
                            role: "CFO",
                            email: "mike@acmecorp.com",
                          },
                        ].map((member, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
                          >
                            <div>
                              <p className="font-semibold">{member.name}</p>
                              <p className="text-sm text-gray-500">
                                {member.role}
                              </p>
                            </div>
                            <button className="rounded border border-red-500 px-3 py-1 text-red-500 hover:bg-red-50">
                              <Mail className="mr-2 inline-block h-4 w-4" />
                              Contact
                            </button>
                          </div>
                        ))}
                      </div>
                      <button className="mt-4 w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
                        <Users className="mr-2 inline-block h-4 w-4" />
                        Manage Team
                      </button> */}
                    </div>
                  )}
                  {/* {activeTab === "stats" && (
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                      <h2 className="mb-4 text-lg font-semibold">
                        Company Statistics
                      </h2>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-500">
                            Annual Revenue
                          </p>
                          <p className="text-2xl font-bold">$10M</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-500">
                            Employees
                          </p>
                          <p className="text-2xl font-bold">50</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-500">
                            Customers
                          </p>
                          <p className="text-2xl font-bold">500+</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-500">
                            Countries Served
                          </p>
                          <p className="text-2xl font-bold">20</p>
                        </div>
                      </div>
                      <div className="mt-6 flex space-x-4">
                        <button className="flex-1 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
                          <BarChart className="mr-2 inline-block h-4 w-4" />
                          View Full Report
                        </button>
                        <button className="flex-1 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
                          <FileText className="mr-2 inline-block h-4 w-4" />
                          Export Data
                        </button>
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </AuthHOC>
  );
}
