"use client";

import React, { useEffect, useState } from "react";
import Header from "../../login-header/header";
import Aside from "components/adminComponents/aside";
import UserList from "../usersList/page";
import CompanyList from '../companyList/page'
import Approval from "../approval/page";
import { useRouter } from "next/navigation";
import AuthHOC, {Role} from "components/common/auth/authHoc";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authAdminToken");
    if (!token) {
      router.replace("/admin/login");
    }
  }, [router]);


  return (
    <AuthHOC role={Role.Admin}>
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-slate-100 shadow-lg">
        <Header />
      </nav>
      <div className="flex mt-[64px]">
        <aside className="w-64 bg-white dark:bg-gray-800">
          <Aside/>
        </aside>
        <div className="flex-1 p-4">
          dashboard
        </div>
      </div>
    </>
    </AuthHOC>
  );
}
