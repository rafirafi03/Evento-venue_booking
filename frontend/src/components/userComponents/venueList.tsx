
import { useSearchParams } from "next/navigation";
import VenueCard from "components/userComponents/venueCard";
import { useGetListedVenuesQuery } from "app/store/slices/companyApiSlices";
import { getUserIdFromToken } from "utils/tokenHelper";
import { IVenue } from "types/types";

export default function VenueList() {
  const searchParams = useSearchParams()

  const filter = {
    search: searchParams.get('search'),
    types: searchParams.get('types')?.split(',') || [],
    priceRange: (() => {
      const priceRange = searchParams.get('priceRange');

      console.log(priceRange," pricerangeeeeeeeeeee")
      
      if (priceRange) {
        // Split and parse the priceRange string into an array of numbers
        const rangeParts = priceRange.split(',').map(Number);

        console.log(rangeParts,"rngeartsssssssssssssss")
        
        // Ensure that we have exactly two valid numbers for min and max
        if (rangeParts.length === 2 && !rangeParts.some(isNaN)) {
          console.log('its nymberrrereer')
          return rangeParts; // Return [min, max] if valid
        }
      }
      
      // Fallback to default range if invalid or missing
      return [0, 10000];
    })(),
  };
  const { data: venues } = useGetListedVenuesQuery(filter);



  console.log("venues in frontend:::",venues)
  const userId = getUserIdFromToken("authUserToken");
  const venue = venues?.venues;


  return (
    <div>
        <h1 className="font-bold font-sans text-2xl">Venues for Your Event</h1>
        <p className="text-gray-600 font-sans text-xs font-bold">Explore Stunning Venues for Your Perfect Event</p>
        <hr className="my-3"/>
        <p className="text-gray-400 font-sans text-xs font-bold my-2">result 10 of 80</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {venue?.length && (
          <>
            {venue?.map((ven: IVenue, index: number) => (
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
