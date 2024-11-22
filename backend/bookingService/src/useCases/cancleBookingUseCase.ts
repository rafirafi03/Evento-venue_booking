import { IBookingRepository } from "../repositories/interfaces";

export class CancelBookingUseCase {
  constructor(
    private _bookingRepository : IBookingRepository
  ) {}

  async execute(
    cancelUserId: string,
    cancelVenueId: string
  ): Promise<any> {
    try {
        await this._bookingRepository.cancelBooking(cancelUserId,cancelVenueId);

        return {success: true}

    } catch (error) {
      throw new Error("Internal server error: ");
    }
  }
}
