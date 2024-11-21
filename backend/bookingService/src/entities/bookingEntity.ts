import mongoose from "mongoose";

export interface IBookingData {
    _id?: mongoose.Types.ObjectId;
    userId: string;
    venueId: string;
    event: string;
    guests: number;
    amount: number;
    bookingDateStart: Date;
    bookingDateEnd: Date;
    cancelReason?: string;
}

export class Booking {
    _id?: mongoose.Types.ObjectId;
    userId: string;
    venueId: string;
    event: string;
    guests: number;
    amount: number;
    bookingDateStart: Date;
    bookingDateEnd: Date;
    cancelReason?: string;

    constructor({ _id,userId,venueId,event,guests,amount,bookingDateStart,bookingDateEnd,cancelReason} : IBookingData) {
        this._id = _id;
        this.userId = userId;
        this.venueId = venueId;
        this.event = event;
        this.guests = guests;
        this.amount = amount;
        this.bookingDateStart = bookingDateStart;
        this.bookingDateEnd = bookingDateEnd;
        this.cancelReason = cancelReason;
    }
}