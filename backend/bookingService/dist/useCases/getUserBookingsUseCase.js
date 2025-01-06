"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserBookingsUseCase = void 0;
const utils_1 = require("../utils");
class GetUserBookingsUseCase {
    constructor(_bookingRepository) {
        this._bookingRepository = _bookingRepository;
    }
    async execute(userId) {
        try {
            const bookings = await this._bookingRepository.getBookingsByUserId(userId);
            if (!bookings) {
                return [];
            }
            else {
                return await Promise.all(bookings.map(async (venue) => {
                    // Ensure you're accessing the correct nested image field
                    const signedUrl = await (0, utils_1.generateSignedUrl)(venue.venueDetails?.image || "");
                    return {
                        ...venue,
                        venueDetails: {
                            ...venue.venueDetails,
                            image: signedUrl, // Replace the image path with the signed URL
                        },
                    };
                }));
            }
        }
        catch (error) {
            throw new Error("Internal server error: " + error.message);
        }
    }
}
exports.GetUserBookingsUseCase = GetUserBookingsUseCase;
