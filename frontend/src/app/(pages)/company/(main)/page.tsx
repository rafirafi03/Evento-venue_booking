"use client";

import React, { useEffect } from "react";
import Header from "../../../../components/common/login-header/header";
import Aside from "../../../../components/companyComponents/aside/page";
import CardWithTab from "components/common/cards/cardWithTab";
import BarChart from "components/common/charts/barChart";
import { useRouter } from "next/navigation";
import RevenueCard from "components/common/cards/revenueCard";
import { useGetCompanyDashboardDetailsQuery } from "app/store/slices/bookingApiSlices";
import { getUserIdFromToken } from "utils/tokenHelper";
import AuthHOC, { Role } from "components/common/auth/authHoc";
import fetchErrorCheck from "utils/fetchErrorCheck";

export default function Page() {
  const router = useRouter();

  const companyId = getUserIdFromToken("authCompanyToken");

  const { data: dashboardDataResult, error: dashboardFetchError } =
    useGetCompanyDashboardDetailsQuery(companyId);

    const dashboardData = dashboardDataResult?.result;

    console.log(dashboardData," dashboarddatatatatatatatatatat")

useEffect(() => {
  const isError = fetchErrorCheck({fetchError: dashboardFetchError, role: 'company'})

  if(isError) {
    router.push('/company/login')
  }
}, [dashboardFetchError, router]);



  return (
    <AuthHOC role={Role.Company}>
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
              <RevenueCard
                title={"Total Bookings"}
                data={dashboardData?.totalBookings}
              />
              <RevenueCard
                title={"Month Revenue"}
                data={dashboardData?.monthlyRevenue}
              />
              <RevenueCard
                title={"Year Revenue"}
                data={dashboardData?.yearlyRevenue}
              />
              <RevenueCard
                title={"Overall Revenue"}
                data={dashboardData?.overallRevenue}
              />
            </div>

            <CardWithTab data={dashboardData} />
            <div className="flex flex-wrap gap-3 sm:gap-6 lg:gap-10 justify-center">
              <BarChart
                dataKeys={["name", "guests", "events", "revenue"]}
                title="Top 3 Venues"
                data={dashboardData?.top3VenueData}
              />
              <BarChart
                dataKeys={["location", "venues", "events", "revenue"]}
                title="Top 3 Locations"
                data={dashboardData?.top3LocationData}
              />
            </div>
          </div>
        </div>
      </>
    </AuthHOC>
  );
}
