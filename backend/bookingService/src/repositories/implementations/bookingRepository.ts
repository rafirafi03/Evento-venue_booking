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
                        venueObjectId: { $toObjectId: '$venueId' },
                        userObjectId: {$toObjectId: '$userId'},
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
                {
                    $lookup: {
                        from: 'users', // Assuming the collection name for users is 'users'
                        localField: 'userObjectId', // Field in BookingModel matching the user's _id
                        foreignField: '_id',
                        as: 'userDetails',
                    },
                },
                {
                    $unwind: {
                        path: '$userDetails',
                        preserveNullAndEmptyArrays: true, // Handle cases where no matching user is found
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
            const bookings = await BookingModel.aggregate([
                {
                    $match: {
                        companyId,
                        status: 'confirmed',
                    },
                },
                {
                    $addFields: {
                        venueObjectId: { $toObjectId: '$venueId' },
                        userObjectId: {$toObjectId: '$userId'},
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
                {
                    $lookup: {
                        from: 'users', // Assuming the collection name for users is 'users'
                        localField: 'userObjectId', // Field in BookingModel matching the user's _id
                        foreignField: '_id',
                        as: 'userDetails',
                    },
                },
                {
                    $unwind: {
                        path: '$userDetails',
                        preserveNullAndEmptyArrays: true, // Handle cases where no matching user is found
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

    async getBookingDetails(id: string): Promise<IBookingData | null> {
        try {
            const booking = await BookingModel.findById({_id:id}).populate('userId').populate('venueId').exec()

            console.log(booking," booking in reporrroror")

            if (!booking) {
                throw new Error('Booking not found');
            }
    
            return booking;
        } catch (error) {
            throw new Error('Error: ' + error);
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