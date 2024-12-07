"use client";

import React, { useEffect, useState } from "react";
import Header from "../../login-header/header";
import Aside from "../aside/page";
import CardWithTab from "components/common/cards/cardWithTab";
import BarChart from "components/common/charts/barChart";
import { useRouter } from "next/navigation";
import RevenueCard from "components/common/cards/revenueCard";

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
          <Aside />
        </aside>
        <div className="flex-1 p-4 space-y-5 bg-slate-100 sm:p-6 md:space-y-6 lg:p-8 mt-5">
          <div className="flex items-center justify-center gap-4 sm:space-x-1 md:space-x-6 lg:space-x-8">
            <RevenueCard title={'Total Bookings'} data={45} />
            <RevenueCard title={'Week Revenue'} data={'₹ 56,000'} />
            <RevenueCard title={'Month Revenue'} data={'₹ 1,00,000'} />
            <RevenueCard title={'Overall Revenue'} data={'₹ 14,00,546'} />
          </div>

          <CardWithTab />
          <div className="flex flex-wrap gap-3 sm:gap-6 lg:gap-10 justify-center">
          <BarChart />
          <BarChart />

          </div>
        </div>
      </div>
    </>
  );
}
