"use client";

import React, { useEffect, useState } from "react";
import Header from "../../login-header/header";
import Aside from "../aside/page";
import Dashboard from '../dashboard/page'
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [page, setPage] = useState("dashboard");

  useEffect(() => {
    const token = localStorage.getItem("authCompanyToken");
    if (!token) {
      router.replace("/company/login");
    }
  }, [router]);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-slate-100 shadow-lg">
        <Header />
      </nav>
      <div className="flex mt-[64px]">
        <aside className="w-64 bg-slate-white dark:bg-gray-800">
          <Aside/>
        </aside>
        <div className="flex-1 p-4 bg-slate-100">
            <Dashboard/>
        </div>
      </div>
    </>
  );
}
