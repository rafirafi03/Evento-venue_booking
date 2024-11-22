"use client";

import React from "react";
import VenueCard from "components/userComponents/venueCard";
import { useGetListedVenuesQuery } from "app/store/slices/companyApiSlices";
import { getUserIdFromToken } from "utils/tokenHelper";

export default function venueList() {
  const { data: venues } = useGetListedVenuesQuery(undefined);
  const userId = getUserIdFromToken("authToken");
  const venue = venues?.venues?.venues;


  return (
    <div>
        <h1 className="font-bold font-sans text-2xl">Venues for Your Event</h1>
        <p className="text-gray-600 font-sans text-xs font-bold">Explore Stunning Venues for Your Perfect Event</p>
        <hr className="my-3"/>
        <p className="text-gray-400 font-sans text-xs font-bold my-2">result 10 of 80</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {venue?.length && (
          <>
            {venue?.map((ven, index) => (
              <>
              <VenueCard
              key={index}
                userId={userId as string}
                venueId={ven._id}
                imageUrl={ven?.images[0]}
                title={ven?.name}
                city={ven?.city}
                state={ven?.state}
                price={ven?.amount}
                capacity={ven?.capacity}
                description={ven?.description}
              />
              </>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
