import React from "react";
import Header from "components/userComponents/header";
import FilterSection from "components/userComponents/filterSection";
import VenueList from "components/userComponents/venueList";

export default function Page() {
  return (
    <div className="bg-slate-50">
      <Header />
      <div className="flex p-4 space-x-4">
        <div className="">
        <FilterSection />

        </div>
        <div className="mt-20 px-5">
        <VenueList/>
        </div>
      </div>
    </div>
  );
}
