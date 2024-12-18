import { IBookingRepository } from "../repositories/interfaces";

export class AdminDashboardUseCase {
  constructor(private _bookingRepository: IBookingRepository) {}

  async execute(): Promise<any> {
    try {
      const bookings = await this._bookingRepository.getBookings();



      console.log("bookings::::::",bookings)

      const totalBookings = bookings?.filter(
        (booking: any) => booking.status === "confirmed"
      ).length;

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      const monthlyRevenue = bookings
        ?.filter((booking: any) => {
          const bookingDate = new Date(booking.bookingDateStart);
          return (
            booking.status === "confirmed" &&
            bookingDate.getMonth() === currentMonth &&
            bookingDate.getFullYear() === currentYear
          );
        })
        .reduce(
          (total: number, booking: any) =>
            total + (booking.venueDetails.amount || 0),
          0
        );

        const monthlyRevenueShare = monthlyRevenue * 0.05

      console.log(monthlyRevenue, "monthlyRevenueeeee");

      const yearlyRevenue = bookings
        ?.filter((booking: any) => {
          const bookingDate = new Date(booking.bookingDateStart);
          return (
            booking.status === "confirmed" &&
            bookingDate.getFullYear() === currentYear
          );
        })
        .reduce(
          (total: number, booking: any) =>
            total + (booking.venueDetails.amount || 0),
          0
        );

        const yearlyRevenueShare = yearlyRevenue * 0.05

      // Calculate overall revenue
      const overallRevenue = bookings
        ?.filter((booking: any) => booking.status === "confirmed")
        .reduce(
          (total: number, booking: any) =>
            total + (booking.venueDetails.amount || 0),
          0
        );

        const overallRevenueShare = overallRevenue * 0.05

      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const monthlySalesData = months.map((month) => ({ month, sales: 0 }));

      // Calculate monthly sales
      bookings?.forEach((booking: any) => {
        const bookingDate = new Date(booking.bookingDateStart);
        if (
          booking.status === "confirmed" &&
          bookingDate.getFullYear() === currentYear
        ) {
          const monthIndex = bookingDate.getMonth();
          const amount = booking.venueDetails.amount || 0;
      
          // Update sales for the specific month
          monthlySalesData[monthIndex].sales += amount * 0.05;

        }
      });
      
      console.log("Monthly Sales Data:", monthlySalesData);
      

      const lastFiveYearRevenue = Array.from({ length: 5 }, (_, i) => currentYear - i)
  .map((year) => {
    // Filter bookings for the current year
    const filteredBookings = bookings?.filter((booking: any) => {
      const bookingDate = new Date(booking.bookingDateStart);
      return (
        booking.status === "confirmed" &&
        bookingDate.getFullYear() === year
      );
    });

    // Calculate total sales for the year
    const totalSales = filteredBookings?.reduce(
      (total: number, booking: any) =>
        total + (booking.venueDetails?.amount * 0.05 || 0),
      0
    ) || 0;

    // Store only 5% of the total sales
    return { year, sales: totalSales };
  })
  .sort((a, b) => a.year - b.year);

console.log("Last Five Year Revenue:", lastFiveYearRevenue);



      const last7DaysSales = Array.from({ length: 7 }, (_, i) => {
        const currentDate = new Date();
        const targetDate = new Date();
        targetDate.setDate(currentDate.getDate() - i);

        const targetDateString = targetDate.toISOString().split("T")[0];

        const sales = bookings
          ?.filter((booking: any) => {
            const bookingDate = new Date(booking.bookingDateStart);
            const bookingDateString = bookingDate.toISOString().split("T")[0];
            return (
              booking.status === "confirmed" &&
              bookingDateString === targetDateString
            );
          })
          .reduce(
            (total: number, booking: any) =>
              total + (booking.venueDetails.amount * 0.05 || 0),
            0
          );

        const formattedDate = targetDate
          .toISOString()
          .split("T")[0]
          .split("-")
          .reverse()
          .join("-");

        return {
          date: formattedDate,
          sales,
        };
      }).sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      console.log(last7DaysSales);

      console.log(lastFiveYearRevenue, "last 5 year revenueueueueue");

      const top3VenueData = bookings
        ? Object.values(
            bookings.reduce((venues: Record<string, any>, booking: any) => {
              if (booking.status === "confirmed") {
                const venueName = booking.venueDetails.name;
                const venueGuests = booking.guests || 0;
                const venueRevenue = booking.venueDetails.amount || 0;

                if (!venues[venueName]) {
                  venues[venueName] = {
                    name: venueName,
                    guests: venueGuests,
                    events: 0,
                    revenue: 0,
                  };
                }

                venues[venueName].events += 1;
                venues[venueName].revenue += venueRevenue;
              }
              return venues;
            }, {})
          )
            .sort((a, b) => b.events - a.events)
            .slice(0, 3)
        : [];

      const top3LocationData = Object.values(
        (bookings || []).reduce(
          (locations: Record<string, any>, booking: any) => {
            if (booking.status === "confirmed") {
              const city = booking.venueDetails.city; // Assuming `city` is a field in `venueDetails`
              const venueName = booking.venueDetails.name; // Assuming `name` is the venue's name
              const venueRevenue = booking.venueDetails.amount || 0;

              if (!locations[city]) {
                // Initialize location data if it doesn't exist
                locations[city] = {
                  location: city,
                  venues: new Set<string>(), // Use a Set to store unique venue names
                  events: 0,
                  revenue: 0,
                };
              }

              // Update the location's data
              locations[city].venues.add(venueName); // Add the venue name to the Set
              locations[city].events += 1;
              locations[city].revenue += venueRevenue;
            }
            return locations;
          },
          {}
        )
      )
        .map((location) => ({
          ...location,
          venues: location.venues.size, // Convert the Set size to the number of venues
        }))
        .sort((a, b) => b.events - a.events) // Sort by number of events in descending order
        .slice(0, 3); // Get the top 3 locations

      console.log(top3LocationData);

      console.log(top3LocationData);

      console.log(top3VenueData);

      const result = {
        bookings,
        totalBookings,
        monthlyRevenue,
        monthlyRevenueShare,
        yearlyRevenue,
        yearlyRevenueShare,
        overallRevenue,
        overallRevenueShare,
        monthlySalesData,
        lastFiveYearRevenue,
        last7DaysSales,
        top3VenueData,
        top3LocationData,
      };

      console.log(totalBookings, " total bookingssss");

      console.log(bookings, "bookings in getbookingsusecase");

      return result;
    } catch (error) {
      throw new Error("Internal server error: ");
    }
  }
}
