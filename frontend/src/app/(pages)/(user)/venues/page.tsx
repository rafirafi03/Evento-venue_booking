"use client";

import React, { Suspense } from "react";
import Header from "components/userComponents/header";
import FilterSection from "components/userComponents/filterSection";
import VenueList from "components/userComponents/venueList";
import Pagination from "components/userComponents/pagination";
import Loader from "components/common/loader/loader";

export default function Page() {
  const pageChange = (arg: number) => {
    console.log("hii", arg);
  };
  return (
    <div className="bg-slate-50 h-screen">
      <Header />
      <div className="flex p-4 space-x-4">
        <div className="">
          <Suspense fallback={<Loader />}>
            <FilterSection />
          </Suspense>
        </div>
        <div className="mt-20 px-5">
          <Suspense fallback={<Loader />}>
            <VenueList />
          </Suspense>
        </div>
      </div>
      <div className="mt-7">
        <Pagination currentPage={1} totalPages={1} onPageChange={pageChange} />
      </div>
    </div>
  );
}
