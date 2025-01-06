"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBookedDatesUseCase = void 0;
class GetBookedDatesUseCase {
    constructor(_bookingRepository) {
        this._bookingRepository = _bookingRepository;
    }
    async execute() {
        try {
            const dates = await this._bookingRepository.getBookedDates();
            console.log(dates, "datesss in confirmeddddd");
            const bookedDates = [];
            dates.forEach(booking => {
                const startDate = new Date(booking.bookingDateStart);
                const endDate = new Date(booking.bookingDateEnd);
                for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                    bookedDates.push(new Date(d).toISOString().split('T')[0]);
                }
            });
            console.log(bookedDates, "bookeddates 123456");
            return bookedDates;
        }
        catch (error) {
            throw new Error("Internal server error: ");
        }
    }
}
exports.GetBookedDatesUseCase = GetBookedDatesUseCase;
