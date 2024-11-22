import { IBookingRepository } from "../repositories/interfaces";

export class GetUserBookingsUseCase {
  constructor(
    private _bookingRepository: IBookingRepository
  ) {}

  async execute(
    userId: string,
  ): Promise<any> {
    try {
        const bookings = await this._bookingRepository.getBookingsByUserId(userId);

        console.log(bookings,"bookings in getbookingsusecase")

        return bookings

    } catch (error) {
      throw new Error("Internal server error: ");
    }
  }
}
