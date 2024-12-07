
export interface IBookingData {
    _id?: string;
    userId: string;
    companyId: string
    venueId: string;
    event: string;
    guests: number;
    amount: number;
    bookingDateStart: Date;
    bookingDateEnd: Date;
    paymentMethod: string;
    status: string;
}

export class Booking {
    _id?: string;
    userId: string;
    companyId: string;
    venueId: string;
    event: string;
    guests: number;
    amount: number;
    bookingDateStart: Date;
    bookingDateEnd: Date;
    paymentMethod: string;
    status: string;

    constructor({ _id,userId,companyId, venueId,event,guests,amount,bookingDateStart,bookingDateEnd, paymentMethod,status} : IBookingData) {
        this._id = _id;
        this.userId = userId;
        this.companyId = companyId;
        this.venueId = venueId;
        this.event = event;
        this.guests = guests;
        this.amount = amount;
        this.bookingDateStart = bookingDateStart;
        this.bookingDateEnd = bookingDateEnd;
        this.paymentMethod = paymentMethod;
        this.status = status;
    }
}