import { IBookingRepository } from "../repositories/interfaces";

export class GetBookingDetailsUseCase {
  constructor(
    private _bookingRepository: IBookingRepository
  ) {}

  async execute(
    id: string,
  ): Promise<any> {
    try {
        const booking = await this._bookingRepository.getBookingDetails(id);

        console.log(booking,"bookings in getbookingsusecase")

        return booking

    } catch (error) {
      throw new Error("Internal server error: ");
    }
  }
}
