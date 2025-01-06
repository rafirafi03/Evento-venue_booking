"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakePaymentUseCase = void 0;
const stripe_1 = __importDefault(require("stripe"));
const grpcUserClient_1 = require("../infrastructure/grpc/grpcServices/grpcUserClient");
const grpcVenueClient_1 = require("../infrastructure/grpc/grpcServices/grpcVenueClient");
const entities_1 = require("../entities");
const mongoose_1 = require("mongoose");
const publisher_1 = require("../infrastructure/messaging/publisher");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
class MakePaymentUseCase {
    constructor(_bookingRepository) {
        this._bookingRepository = _bookingRepository;
    }
    async execute(userId, venueId, event, guests, bookingDuration, paymentMethod, offerPercentage) {
        try {
            const startDate = new Date(Date.UTC(bookingDuration.start.year, bookingDuration.start.month - 1, bookingDuration.start.day));
            const endDate = new Date(Date.UTC(bookingDuration.end.year, bookingDuration.end.month - 1, bookingDuration.end.day));
            const overlappingBookings = await this._bookingRepository.findOverlappingBookings(venueId, startDate, endDate);
            if (overlappingBookings.length > 0) {
                return { success: false, message: 'inavlid date. try again later' };
            }
            const userDetails = await (0, grpcUserClient_1.getUserDetails)(userId); //grpc
            const venueDetails = await (0, grpcVenueClient_1.getVenueDetails)(venueId); //grpc
            console.log(venueDetails, "venueDetails through grpcccccc");
            startDate.setUTCHours(0, 0, 0, 0);
            endDate.setUTCHours(0, 0, 0, 0);
            const timeDiff = endDate.getTime() - startDate.getTime();
            const days = timeDiff / (1000 * 3600 * 24) + 1;
            const totalAmount = offerPercentage !== 0
                ? (venueDetails.venueAmount - (venueDetails.venueAmount * (offerPercentage / 100))) * days
                : venueDetails.venueAmount * days;
            let finalAmount = totalAmount * 0.10;
            if (finalAmount > 25000) {
                finalAmount = 25000;
            }
            if (paymentMethod == 'wallet') {
                const booking = new entities_1.Booking({
                    userId,
                    venueId,
                    companyId: venueDetails?.companyId,
                    amount: finalAmount,
                    event,
                    guests,
                    bookingDateStart: startDate,
                    bookingDateEnd: endDate,
                    paymentMethod: paymentMethod,
                    status: 'confirmed'
                });
                await this._bookingRepository.save(booking);
                const findUser = await this._bookingRepository.findUser(userId);
                const findVenue = await this._bookingRepository.findVenue(venueId);
                if (!findUser) {
                    const user = new entities_1.User({
                        _id: new mongoose_1.Types.ObjectId(userId),
                        name: userDetails.name,
                        email: userDetails.email,
                        phone: userDetails.phone,
                    });
                    await this._bookingRepository.saveUser(user);
                }
                if (!findVenue) {
                    const venue = new entities_1.Venue({
                        _id: venueId,
                        name: venueDetails.venueName,
                        amount: venueDetails.venueAmount,
                        city: venueDetails.venueCity,
                        state: venueDetails.venueState,
                        image: venueDetails.venueImage,
                    });
                    await this._bookingRepository.saveVenue(venue);
                }
                await (0, publisher_1.publishRefundMessage)({
                    userId: userId,
                    amount: finalAmount,
                    transactionType: 'debit',
                    date: new Date().toISOString()
                });
                return { success: true };
            }
            else {
                const lineItems = [
                    {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: "Advance amount",
                            },
                            unit_amount: finalAmount, // Total amount based on the number of guests (in cents)
                        },
                        quantity: 1,
                    },
                ];
                // Create a session in Stripe
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ["card"],
                    line_items: lineItems,
                    mode: "payment",
                    success_url: `http://localhost:3000/venueDetails/${venueId}`,
                    cancel_url: `http://localhost:3000/venueDetails/${venueId}`,
                    metadata: {
                        userDetails: JSON.stringify(userDetails),
                        venueDetails: JSON.stringify(venueDetails),
                        userId: userId,
                        venueId: venueId,
                        eventName: event,
                        finalAmount: JSON.stringify(finalAmount),
                        paymentMethod: paymentMethod,
                        guests: JSON.stringify(guests),
                        bookingDateStart: startDate.toISOString(),
                        bookingDateEnd: endDate.toISOString(),
                    }
                });
                return { id: session.id, success: true };
            }
            // Return the session ID to the frontend for redirection
        }
        catch (error) {
            throw new Error("Internal server error: ");
        }
    }
}
exports.MakePaymentUseCase = MakePaymentUseCase;
