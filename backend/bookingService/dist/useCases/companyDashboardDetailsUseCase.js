"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyDashboardDetailsUseCase = void 0;
class CompanyDashboardDetailsUseCase {
    constructor(_bookingRepository) {
        this._bookingRepository = _bookingRepository;
    }
    async execute(companyId) {
        try {
            const bookings = await this._bookingRepository.getBookingsByCompanyId(companyId);
            const totalBookings = bookings?.filter((booking) => booking.status === "confirmed").length;
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            const monthlyRevenue = bookings
                ?.filter((booking) => {
                const bookingDate = new Date(booking.bookingDateStart);
                return (booking.status === "confirmed" &&
                    bookingDate.getMonth() === currentMonth &&
                    bookingDate.getFullYear() === currentYear);
            })
                .reduce((total, booking) => total + (booking.venueDetails.amount || 0), 0);
            console.log(monthlyRevenue, "monthlyRevenueeeee");
            const yearlyRevenue = bookings
                ?.filter((booking) => {
                const bookingDate = new Date(booking.bookingDateStart);
                return (booking.status === "confirmed" &&
                    bookingDate.getFullYear() === currentYear);
            })
                .reduce((total, booking) => total + (booking.venueDetails.amount || 0), 0);
            // Calculate overall revenue
            const overallRevenue = bookings
                ?.filter((booking) => booking.status === "confirmed")
                .reduce((total, booking) => total + (booking.venueDetails.amount || 0), 0);
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
            bookings?.forEach((booking) => {
                const bookingDate = new Date(booking.bookingDateStart);
                if (booking.status === "confirmed" &&
                    bookingDate.getFullYear() === currentYear) {
                    const monthIndex = bookingDate.getMonth();
                    monthlySalesData[monthIndex].sales +=
                        booking.venueDetails.amount || 0;
                }
            });
            const lastFiveYearRevenue = Array.from({ length: 5 }, (_, i) => currentYear - i)
                .map((year) => {
                const sales = bookings
                    ?.filter((booking) => {
                    const bookingDate = new Date(booking.bookingDateStart);
                    return (booking.status === "confirmed" &&
                        bookingDate.getFullYear() === year);
                })
                    .reduce((total, booking) => total + (booking.venueDetails.amount || 0), 0);
                return { year: year.toString(), sales };
            })
                .sort((a, b) => parseInt(a.year) - parseInt(b.year));
            const last7DaysSales = Array.from({ length: 7 }, (_, i) => {
                const currentDate = new Date();
                const targetDate = new Date();
                targetDate.setDate(currentDate.getDate() - i);
                const targetDateString = targetDate.toISOString().split("T")[0];
                const sales = bookings
                    ?.filter((booking) => {
                    const bookingDate = new Date(booking.bookingDateStart);
                    const bookingDateString = bookingDate.toISOString().split("T")[0];
                    return (booking.status === "confirmed" &&
                        bookingDateString === targetDateString);
                })
                    .reduce((total, booking) => total + (booking.venueDetails.amount || 0), 0);
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
            }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            console.log(last7DaysSales);
            console.log(lastFiveYearRevenue, "last 5 year revenueueueueue");
            const top3VenueData = bookings
                ? Object.values(bookings.reduce((venues, booking) => {
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
                }, {}))
                    .sort((a, b) => b.events - a.events)
                    .slice(0, 3)
                : [];
            const top3LocationData = Object.values((bookings || []).reduce((locations, booking) => {
                if (booking.status === "confirmed") {
                    const city = booking.venueDetails.city; // Assuming `city` is a field in `venueDetails`
                    const venueName = booking.venueDetails.name; // Assuming `name` is the venue's name
                    const venueRevenue = booking.venueDetails.amount || 0;
                    if (!locations[city]) {
                        // Initialize location data if it doesn't exist
                        locations[city] = {
                            location: city,
                            venues: new Set(), // Use a Set to store unique venue names
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
            }, {}))
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
                yearlyRevenue,
                overallRevenue,
                monthlySalesData,
                lastFiveYearRevenue,
                last7DaysSales,
                top3VenueData,
                top3LocationData,
            };
            console.log(totalBookings, " total bookingssss");
            console.log(bookings, "bookings in getbookingsusecase");
            return { result };
        }
        catch (error) {
            throw new Error("Internal server error: ");
        }
    }
}
exports.CompanyDashboardDetailsUseCase = CompanyDashboardDetailsUseCase;
