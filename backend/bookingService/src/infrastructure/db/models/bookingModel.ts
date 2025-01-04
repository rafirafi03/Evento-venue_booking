import mongoose, { Document, Schema} from 'mongoose';
import { IVenue } from './venueModel';
import { IUser } from './userModel';

export interface IBooking extends Document {
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
    status:string;
}

const BookingSchema: Schema = new Schema<IBooking>({
    venueId: {
        type: String,
        required: true,
        ref: 'Venue'
      },
      userId: {
        type: String,
        required: true,
        ref: 'User'
      },
      companyId: {
        type: String,
        required: true
      },
      amount: {
        type: Number,
        required: true,
      },
      bookingDateStart: {
        type: Date,
        required: true
      },
      bookingDateEnd: {
        type: Date,
        required: true,
      },
      event: {
        type: String,
        required: true
      },
      guests: {
        type: Number,
        required: true
      },
      paymentMethod: {
        type: String,
        enum: ['wallet', 'online'],
        required: true
      },
      status: {
        type: String,
        enum: ['confirmed' , 'cancelled'],
        required: true
      }

})

export const BookingModel = mongoose.model<IBooking>('Booking', BookingSchema);
