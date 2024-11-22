import { IBookingRepository } from "../repositories/interfaces";

export class GetCompanyBookingsUseCase {
  constructor(
    private _bookingRepository: IBookingRepository
  ) {}

  async execute(
    companyId: string,
  ): Promise<any> {
    try {
        const bookings = await this._bookingRepository.getBookingsByCompanyId(companyId);

        console.log(bookings,"bookings in getbookingsusecase")

        return bookings

    } catch (error) {
      throw new Error("Internal server error: ");
    }
  }
}
