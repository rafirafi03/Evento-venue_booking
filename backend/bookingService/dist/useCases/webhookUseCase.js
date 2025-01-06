"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookUseCase = void 0;
const stripe_1 = __importDefault(require("stripe"));
const entities_1 = require("../entities");
const mongoose_1 = require("mongoose");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
class WebhookUseCase {
    constructor(_bookingRepository) {
        this._bookingRepository = _bookingRepository;
    }
    async execute(event) {
        try {
            if (event.type === "checkout.session.completed") {
                const session = event.data.object;
                console.log('yesss insideee webhookkkkk');
                if (session.metadata) {
                    const { userId, venueId, eventName, finalAmount, guests, paymentMethod, bookingDateStart, bookingDateEnd, } = session.metadata;
                    const { name, email, phone } = JSON.parse(session.metadata.userDetails);
                    const { venueName, venueAmount, venueCity, venueState, venueImage, companyId } = JSON.parse(session.metadata.venueDetails);
                    const guestCount = Number(guests);
                    const amount = Number(venueAmount);
                    const userPhone = Number(phone);
                    const advance = Number(finalAmount);
                    const startDate = new Date(bookingDateStart);
                    const endDate = new Date(bookingDateEnd);
                    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
                        console.log("Start Date:", startDate);
                        console.log("End Date:", endDate);
                    }
                    else {
                        console.error("Invalid dates:", { startDate, endDate });
                    }
                    if (isNaN(guestCount)) {
                        throw new Error("Invalid guests count");
                    }
                    if (isNaN(amount)) {
                        throw new Error("Invalid amount");
                    }
                    const booking = new entities_1.Booking({
                        userId,
                        venueId,
                        companyId,
                        amount: advance,
                        event: eventName,
                        guests: guestCount,
                        bookingDateStart: startDate,
                        bookingDateEnd: endDate,
                        paymentMethod,
                        status: 'confirmed'
                    });
                    await this._bookingRepository.save(booking);
                    const findUser = await this._bookingRepository.findUser(userId);
                    const findVenue = await this._bookingRepository.findVenue(venueId);
                    if (!findUser) {
                        const user = new entities_1.User({
                            _id: new mongoose_1.Types.ObjectId(userId),
                            name,
                            email,
                            phone: userPhone,
                        });
                        await this._bookingRepository.saveUser(user);
                    }
                    if (!findVenue) {
                        const venue = new entities_1.Venue({
                            _id: venueId,
                            name: venueName,
                            amount: amount,
                            city: venueCity,
                            state: venueState,
                            image: venueImage,
                        });
                        await this._bookingRepository.saveVenue(venue);
                    }
                }
            }
            return { success: true };
        }
        catch (error) {
            console.error(error);
            throw new Error("Internal server error: " + error);
        }
    }
}
exports.WebhookUseCase = WebhookUseCase;
