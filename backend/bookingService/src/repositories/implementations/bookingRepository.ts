import { IBookingData, Booking, User, Venue } from "../../entities";
import { IBooking, BookingModel, VenueModel, UserModel  } from "../../infrastructure/db";
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
            const newUser = new UserModel(user)
            await newUser.save()
        } catch (error) {
            throw new Error('Error' + error)
        }
    }

    async saveVenue(venue: Venue): Promise<void> {
        try {
            const newVenue = new VenueModel(venue)
            await newVenue.save()
        } catch (error) {
            throw new Error('Error' + error)
        }
    }

}   