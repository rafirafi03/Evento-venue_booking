"use client";

import React from "react";
import Header from "components/userComponents/header";
import FilterSection from "components/userComponents/filterSection";
import VenueList from "components/userComponents/venueList";
import Pagination from "components/userComponents/pagination";

export default function Page() {
  const pageChange = (arg) => {
    console.log("hii", arg);
  };
  return (
    <div className="bg-slate-50">
      <Header />
      <div className="flex p-4 space-x-4">
        <div className="">
          <FilterSection />
        </div>
        <div className="mt-20 px-5">
          <VenueList />
        </div>
      </div>
      <div className="-mt-10">
        <Pagination currentPage={1} totalPages={1} onPageChange={pageChange} />
      </div>
    </div>
  );
}
