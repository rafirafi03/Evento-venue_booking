import mongoose from "mongoose";
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

    async getBookingsByCompanyId(companyId: string): Promise<IBookingData[]> {
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
                []
            }
            return bookings;
        } catch (error) {
            throw new Error('Error: ' + error);
        }
    }

    async getBookingDetails(id: string): Promise<any> {
        try {
            const booking = await BookingModel.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(id) } }, // Match the booking ID
                {
                    $addFields: {
                        venueObjectId: { $toObjectId: '$venueId' },
                        userObjectId: {$toObjectId: '$userId'},
                    },
                },
                {
                    $lookup: {
                        from: 'users', // The collection name for UserModel
                        localField: 'userObjectId', // Field in BookingModel
                        foreignField: '_id', // Field in UserModel
                        as: 'userDetails', // Output field
                    },
                },
                {
                    $lookup: {
                        from: 'venues', // The collection name for VenueModel
                        localField: 'venueObjectId', // Field in BookingModel
                        foreignField: '_id', // Field in VenueModel
                        as: 'venueDetails', // Output field
                    },
                },
                { $unwind: { path: '$userDetails', preserveNullAndEmptyArrays: true } }, // Flatten the userDetails array
                { $unwind: { path: '$venueDetails', preserveNullAndEmptyArrays: true } }, // Flatten the venueDetails array
            ]);
    
            if (!booking || booking.length === 0) {
                throw new Error('Booking not found');
            }

            console.log(booking[0]," booking in repoooo 123")
    
            return booking[0]; // Since aggregate returns an array, get the first element
        } catch (error) {
            throw new Error('Error: ' + error);
        }
    }
    

    async getBookings(): Promise<IBookingData[]> {
        try {
            const bookings = await BookingModel.aggregate([
                {
                    $match: {
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
                return [];
            }
            return bookings;
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

    async findOverlappingBookings(
        venueId: string,
        startDate: Date,
        endDate: Date
      ): Promise<Booking[]> {
        return BookingModel.find({
          venueId: venueId,
          status: "confirmed",
          $or: [
            { bookingDateStart: { $lte: endDate, $gte: startDate } },
            { bookingDateEnd: { $lte: endDate, $gte: startDate } },
            { bookingDateStart: { $lte: startDate }, bookingDateEnd: { $gte: endDate } },
          ],
        }).exec();
      }
      
      async getBookedDates(): Promise<IBooking[]> {
        try {
            const response = await BookingModel.find({ status: "confirmed" }, { bookingDateStart: 1, bookingDateEnd: 1, _id: 0 }).exec();

            console.log(response,"ress ress ress ")

            return response

        } catch (error) {
            throw new Error('Error fetching confirmed booked dates: ' + error);
        }
    }
    

}   