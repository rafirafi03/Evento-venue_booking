import { IBooking } from "../../infrastructure/db";
import { IUserData, User, IBookingData, Booking, Venue  } from '../../entities'

export interface IBookingRepository {
    save(booking:Booking) : Promise<void>
    saveUser(user: User) : Promise<void>
    saveVenue(venue: Venue) : Promise<void>
}

export { IBooking };