import { IBooking } from "../../infrastructure/db";
import { IUserData, User, IBookingData, Booking  } from '../../entities'

export interface IBookingRepository {
    save(booking:Booking) : Promise<void>
    saveUser(user: User) : Promise<void>
}

export { IBooking };