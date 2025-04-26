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

      console.log('boookinggg first', bookings)

      if (!bookings) {
        return [];
      } else {

        console.log("bookings 12345 :>>> " , bookings)
        return bookings
      }

    } catch (error: any) {
      throw new Error("Internal server error: " + error.message);
    }
  }
}
