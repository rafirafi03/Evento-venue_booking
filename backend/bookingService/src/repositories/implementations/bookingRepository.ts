import { IBookingData, Booking, User } from "../../entities";
import { IBooking, BookingModel  } from "../../infrastructure/db";
import { IBookingRepository } from "../interfaces";

export class BookingRepository implements IBookingRepository {

    async save(booking:Booking): Promise<void> {
        try {
            const newBooking = new BookingModel(booking);
            await newBooking.save();
        } catch (error) {
            throw new Error('Error' + error)
        }
    }

    async saveUser(user: User): Promise<void> {
        try {
            const newUser = new BookingModel(user)
            await newUser.save()
        } catch (error) {
            throw new Error('Error' + error)
        }
    }

}   