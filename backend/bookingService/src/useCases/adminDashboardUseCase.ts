import { IBookingRepository } from "../repositories/interfaces";
import { IDashboardData, IDashboardDataResult } from "./types";

export class AdminDashboardUseCase {
  constructor(private _bookingRepository: IBookingRepository) {}

  async execute(): Promise<{result : IDashboardData}> {
    try {
      const bookings = await this._bookingRepository.getBookings();

      console.log("bookings::::::", bookings);

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

      const monthlyRevenueShare = monthlyRevenue * 0.05;

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

      const yearlyRevenueShare = yearlyRevenue * 0.05;

      const overallRevenue = bookings
        ?.filter((booking: any) => booking.status === "confirmed")
        .reduce(
          (total: number, booking: any) =>
            total + (booking.venueDetails.amount || 0),
          0
        );

      const overallRevenueShare = overallRevenue * 0.05;

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

      bookings?.forEach((booking: any) => {
        const bookingDate = new Date(booking.bookingDateStart);
        if (
          booking.status === "confirmed" &&
          bookingDate.getFullYear() === currentYear
        ) {
          const monthIndex = bookingDate.getMonth();
          const amount = booking.venueDetails.amount || 0;

          monthlySalesData[monthIndex].sales += amount * 0.05;
        }
      });

      console.log("Monthly Sales Data:", monthlySalesData);

      const lastFiveYearRevenue = Array.from(
        { length: 5 },
        (_, i) => currentYear - i
      )
        .map((year) => {
          const filteredBookings = bookings?.filter((booking: any) => {
            const bookingDate = new Date(booking.bookingDateStart);
            return (
              booking.status === "confirmed" &&
              bookingDate.getFullYear() === year
            );
          });

          const totalSales =
            filteredBookings?.reduce(
              (total: number, booking: any) =>
                total + (booking.venueDetails?.amount * 0.05 || 0),
              0
            ) || 0;

          return { year: year.toString(), sales: totalSales };
        })
        .sort((a, b) => parseInt(a.year) - parseInt(b.year));

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
              const city = booking.venueDetails.city;
              const venueName = booking.venueDetails.name;
              const venueRevenue = booking.venueDetails.amount || 0;

              if (!locations[city]) {
                locations[city] = {
                  location: city,
                  venues: new Set<string>(),
                  events: 0,
                  revenue: 0,
                };
              }

              locations[city].venues.add(venueName);
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
          venues: location.venues.size,
        }))
        .sort((a, b) => b.events - a.events)
        .slice(0, 3);

      console.log(top3LocationData);

      console.log(top3LocationData);

      console.log(top3VenueData);

      const result: IDashboardData = {
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

      return {result};
    } catch (error) {
      throw new Error("Internal server error: ");
    }
  }
}
