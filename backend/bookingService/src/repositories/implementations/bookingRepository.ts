import { IBookingData, Booking, User, Venue, IVenueData, IUserData } from "../../entities";
import { IBooking, BookingModel, VenueModel, UserModel, IVenue  } from "../../infrastructure/db";
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

    async getBookingsByUserId(userId: string): Promise<IBookingData[] | null> {
        try {
            const bookings = await BookingModel.aggregate([
                {
                    $match: {
                        userId,
                        status: 'confirmed',
                    },
                },
                {
                    $addFields: {
                        venueObjectId: { $toObjectId: '$venueId' }, // Convert venueId (string) to ObjectId
                    },
                },
                {
                    $lookup: {
                        from: 'venues', // Correct pluralized collection name
                        localField: 'venueObjectId', // Use the converted ObjectId field
                        foreignField: '_id',
                        as: 'venueDetails',
                    },
                },
                {
                    $unwind: {
                        path: '$venueDetails',
                        preserveNullAndEmptyArrays: true, // Handle cases where no matching venue is found
                    },
                },
            ]).exec();
    
            console.log(bookings, "bookings with venue details in repository");
            if (!bookings || bookings.length === 0) {
                return null;
            }
            return bookings;
        } catch (error) {
            throw new Error('Error: ' + error);
        }
    }

    async getBookingsByCompanyId(companyId: string): Promise<IBookingData[] | null> {
        try {

            const bookings = await BookingModel.find({companyId})

            console.log(bookings," bookings in repooooooooooooooooooooo")
            if(!bookings) {
                return null
            }
            return bookings
        } catch (error) {
            throw new Error('Error' + error)
        }
    }


    async findUser(userId: string): Promise<IUserData | null> {
        try {
            const user = await UserModel.findOne({_id:userId})

            if(user) return user

            return null

        } catch (error) {
            throw new Error('Error' + error)
        }
    }

    async findVenue(venueId: string): Promise<IVenueData | null> {
        try {
            const venue = await VenueModel.findOne({_id:venueId})

            if(venue) return venue

            return null

        } catch (error) {
            throw new Error('Error' + error)
        }
    }

    async findBooking(bookingId: string): Promise<IBookingData | null> {
        try {
            const booking = BookingModel.findOne({_id: bookingId});
            return booking
        } catch (error) {
            throw new Error('Error' + error)
        }
    }

}   