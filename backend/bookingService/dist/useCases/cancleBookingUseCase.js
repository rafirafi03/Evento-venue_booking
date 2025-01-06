"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelBookingUseCase = void 0;
const publisher_1 = require("../infrastructure/messaging/publisher");
class CancelBookingUseCase {
    constructor(_bookingRepository) {
        this._bookingRepository = _bookingRepository;
    }
    async execute(bookingId) {
        try {
            const booking = await this._bookingRepository.findBooking(bookingId);
            if (booking) {
                booking.status = 'cancelled';
                await this._bookingRepository.save(booking);
                (0, publisher_1.publishRefundMessage)({
                    userId: booking.userId,
                    amount: booking.amount,
                    transactionType: 'credit',
                    date: new Date().toISOString()
                });
            }
            else {
                return { success: false };
            }
            return { success: true };
        }
        catch (error) {
            throw new Error("Internal server error: ");
        }
    }
}
exports.CancelBookingUseCase = CancelBookingUseCase;
