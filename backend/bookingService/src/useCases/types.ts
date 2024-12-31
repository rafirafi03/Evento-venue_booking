import { IBookingData } from "../entities";
import { IBooking } from "../infrastructure/db";

export interface IDashboardDataResult {
    result : IDashboardData;
}

export interface IDashboardData {
    
    bookings? : IBookingData[] | [] ;
    last7DaysSales? : ILast7DaysSales[];
    lastFiveYearRevenue?: ILastFiveYearRevenue[];
    monthlyRevenue?: number;
    monthlyRevenueShare?: number;
    monthlySalesData? : IMonthlySalesData[];
    overallRevenue?: number;
    overallRevenueShare?: number;
    top3LocationData?: string[] | null;
    top3VenueData?: string[] | null ;
    totalBookings?: number;
    yearlyRevenue?: number;
    yearlyRevenueShare?: number;

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
  