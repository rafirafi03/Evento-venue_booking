"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCompanyBookingsUseCase = void 0;
class GetCompanyBookingsUseCase {
    constructor(_bookingRepository) {
        this._bookingRepository = _bookingRepository;
    }
    async execute(companyId) {
        try {
            const bookings = await this._bookingRepository.getBookingsByCompanyId(companyId);
            console.log(bookings, "bookings in getbookingsusecase");
            return bookings;
        }
        catch (error) {
            throw new Error("Internal server error: ");
        }
    }
}
exports.GetCompanyBookingsUseCase = GetCompanyBookingsUseCase;
