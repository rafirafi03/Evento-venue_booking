import { IBooking } from "../../infrastructure/db";
import {
  IUserData,
  User,
  IBookingData,
  Booking,
  Venue,
  IVenueData,
} from "../../entities";

export interface IBookingRepository {
  save(booking: Booking): Promise<void>;
  saveUser(user: User): Promise<void>;
  saveVenue(venue: Venue): Promise<void>;
  getBookingsByUserId(userId: string): Promise<IBookingData[] | null>;
  getBookingsByCompanyId(companyId: string): Promise<IBookingData[]>;
  getBookingDetails(id: string): Promise<IBookingData | null>;
  getBookings(): Promise<IBookingData[]>;
  findUser(userId: string): Promise<IUserData | null>;
  findVenue(venueId: string): Promise<IVenueData | null>;
  findBooking(bookingId: string): Promise<IBookingData | null>;
  findOverlappingBookings(
    venueId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Booking[]>;
  getBookedDates(): Promise<IBooking[]>
}

export { IBooking };
