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
  amount: number;
  offerDetails?: IOffer

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
    
  bookings? : IBookingData[] | [] ;
  last7DaysSales? : ILast7DaysSales[] | [];
  lastFiveYearRevenue? : ILastFiveYearRevenue[] | [];
  monthlyRevenue? : number;
  monthlyRevenueShare? : number;
  monthlySalesData?  : IMonthlySalesData[] | [];
  overallRevenue? :  number;
  overallRevenueShare? : number;
  top3LocationData? : string[] | null;
  top3VenueData? : string[] | null ;
  totalBookings? : number;
  yearlyRevenue? : number;
  yearlyRevenueShare? : number;

}  

export interface ILast7DaysSales {
  date: string;
  sales : number
}

export interface ILastFiveYearRevenue {
  year: string;
  sales : number
}

export interface IMonthlySalesData {
  month: string;
  sales : number
}

export interface IBookingData {
  _id?: string;
  userId: string;
  companyId: string
  venueId: string;
  event: string;
  guests: number;
  amount: number;
  bookingDateStart: Date;
  bookingDateEnd: Date;
  paymentMethod: string;
  status: string;
  venueDetails?: {
      _id: string;
      name: string;
      amount: number;
      city: string;
      state: string;
      image: string; // Add the image field here
    };
    userDetails?: {
      _id: string;
      name: string;
      email: string;
      phone: number;
    };
}

export interface IOffer {
  _id: string;
  companyId: string;
  name: string;
  percentage: number;
  validity: number;
}

export interface GoogleCredentialsResponse {
  credentials : string
}

// export interface User {

// }
