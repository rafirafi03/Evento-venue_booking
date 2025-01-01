"use client";

import React, { useEffect } from "react";
import Header from "../../login-header/header";
import Aside from "components/adminComponents/aside";
import CardWithTab from "components/common/cards/cardWithTab";
import BarChart from "components/common/charts/barChart";
import { useRouter } from "next/navigation";
import RevenueCard from "components/common/cards/revenueCard";
// import { getUserIdFromToken } from "utils/tokenHelper";
import AuthHOC, { Role } from "components/common/auth/authHoc";
import { useGetAdminDashboardDetailsQuery } from "app/store/slices/bookingApiSlices";

export default function Page() {
  const router = useRouter();

  // const adminId = getUserIdFromToken("authAdminToken");

  const { data: dashboardDataResult, error: dahsboardFetchError } =
    useGetAdminDashboardDetailsQuery(undefined);

  const dashboardData = dashboardDataResult?.result;

  useEffect(() => {
    if (dahsboardFetchError && "status" in dahsboardFetchError) {
      if (dahsboardFetchError.status === 401) {
        console.warn("Session expired. Logging out...");
        localStorage.removeItem("authAdminToken");
        router.push("/admin/login");
      }
    }
  }, [dahsboardFetchError, router]);

  console.log(dashboardData, "dahsboard datattatatattatat");

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
                data={dashboardData?.monthlyRevenueShare}
              />
              <RevenueCard
                title={"Year Revenue"}
                data={dashboardData?.yearlyRevenueShare}
              />
              <RevenueCard
                title={"Overall Revenue"}
                data={dashboardData?.overallRevenueShare}
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
