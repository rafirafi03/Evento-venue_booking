import mongoose, { Document, Schema} from 'mongoose';

export enum VerificationStatus {
    Pending = "pending",
    Verified = "verified",
    Rejected = "rejected"
}

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
    cancelReason?:string;
}

const BookingSchema: Schema = new Schema<IBooking>({
    venueId: {
        type: String,
        required: true,
      },
      userId: {
        type: String,
        required: true,
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
      cancelReason: {
        type: String,
      }
})

export const BookingModel = mongoose.model<IBooking>('Booking', BookingSchema);
