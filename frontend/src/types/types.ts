export interface IBooking {
  _id: string;
  venueId: string;
  userId: string;
  companyId: string;
  amount: number;
  bookingDateStart: Date;
  bookingDateEnd: Date;
  event: string;
  guests: number;
  paymentMethod: string;
  status: string;
  venueDetails: IVenueDetails;
}

export interface IVenueDetails {
    name: string;
  image: string;
  city: string;
  state: string;
}

export interface IVenue {
    _id: string;
  name: string;
  images: string[];
  city: string;
  state: string;
  capacity: number;
  description: string;
  amount: string;

}

export interface IFavourite {
  _id: string;
  userId: string;
  venueId: string;
  venueName: string;
  venueAddress: string;
  venueImage: string;
}

export interface IReview {
  _id: string;
  venueId: string;
  userId: string;
  userName: string;
  userEmail: string;
  star: number;
  review: string;
}

export interface IDashboardData {
    bookings : string | number;
    last7DaysSales : string[];
    lastFiveYearRevenue: string[];
    monthlySalesData : string[];
    top3LocationData: string[];
    top3VenueData: string[]

} 

// export interface User {

// }
