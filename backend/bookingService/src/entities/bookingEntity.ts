
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
    venueDetails?: {
        _id: string;
        name: string;
        amount: number;
        city: string;
        state: string;
        image: string; // Add the image field here
      };
      userDetails?: {
        _id: string;
        name: string;
        email: string;
        phone: number;
      };
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