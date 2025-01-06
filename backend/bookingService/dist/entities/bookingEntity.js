"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
class Booking {
    constructor({ _id, userId, companyId, venueId, event, guests, amount, bookingDateStart, bookingDateEnd, paymentMethod, status }) {
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
exports.Booking = Booking;
