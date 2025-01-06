"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBookingDetailsUseCase = void 0;
const utils_1 = require("../utils");
class GetBookingDetailsUseCase {
    constructor(_bookingRepository) {
        this._bookingRepository = _bookingRepository;
    }
    async execute(id) {
        try {
            console.log(id, " id in bokingddetails use case");
            const booking = await this._bookingRepository.getBookingDetails(id);
            console.log(booking, " bookingg venueid. there is no ot");
            if (booking && booking.venueDetails && booking.venueDetails.image) {
                console.log('inside is okkkkkkkkkkkkkkk');
                // Generate the signed URL for the image
                const imageUrl = await (0, utils_1.generateSignedUrl)(booking?.venueDetails?.image);
                console.log(imageUrl, " iamgeurllllll");
                console.log(booking.venueDetails, "booking venuedetailsssssss");
                return {
                    ...booking,
                    venueDetails: {
                        ...booking.venueDetails,
                        image: imageUrl,
                    },
                };
            }
            console.log(booking, " booking hurekaaaaaaa");
            return booking;
        }
        catch (error) {
            throw new Error("Internal server error: ");
        }
    }
}
exports.GetBookingDetailsUseCase = GetBookingDetailsUseCase;
