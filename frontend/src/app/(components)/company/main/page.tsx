"use client";

import React, { useEffect, useState } from "react";
import Header from "../../login-header/header";
import Aside from "../aside/page";
import Venues from '../venues/page'
import AddVenue from '../addVenue/page'
// import UserList from "../userslist/page";
// import CompanyList from '../companyList/page'
// import Approval from "../approval/page";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [page, setPage] = useState("dashboard");

  useEffect(() => {
    const token = localStorage.getItem("authAdminToken");
    if (!token) {
      router.replace("/admin/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("authAdminToken");
    router.replace("/admin/login");
  };

  const changePage = (arg: string) => {
    setPage(arg);
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-slate-100 shadow-lg">
        <Header />
      </nav>
      <div className="flex mt-[64px]">
        <aside className="w-64 bg-white dark:bg-gray-800">
          <Aside
            handleLogout={handleLogout}
            changePage={changePage}
            page={page}
          />
        </aside>
        <div className="flex-1 p-4">
          {page === "addVenue" ? (
            <AddVenue />
          ) : page === "dashboard" ? (
            <AddVenue/>
          ) : page === "inbox" ? (
            <Venues changePage={changePage}/>
          ) : page === "addVenue" ? (
            <AddVenue />
          ) : (
            <Venues changePage={changePage}/>
          )}
        </div>
      </div>
    </>
  );
}
