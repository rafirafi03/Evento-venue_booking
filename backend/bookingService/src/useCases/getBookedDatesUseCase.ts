import { IBookingRepository } from "../repositories/interfaces";

export class GetBookedDatesUseCase {
  constructor(
    private _bookingRepository: IBookingRepository
  ) {}

  async execute(): Promise<string[]> {
    try {

        const dates = await this._bookingRepository.getBookedDates();

        console.log(dates,"datesss in confirmeddddd")

        const bookedDates: string[] = [];

        dates.forEach(booking => {
            const startDate = new Date(booking.bookingDateStart);
            const endDate = new Date(booking.bookingDateEnd);

            for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                bookedDates.push(new Date(d).toISOString().split('T')[0]);
            }
        });

        console.log(bookedDates,"bookeddates 123456")

        return bookedDates;

    } catch (error) {
      throw new Error("Internal server error: ");
    }
  }
}
