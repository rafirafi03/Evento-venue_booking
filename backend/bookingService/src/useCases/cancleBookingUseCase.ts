import { IBookingRepository } from "../repositories/interfaces";
import { publishRefundMessage } from "../infrastructure/messaging/publisher";

export class CancelBookingUseCase {
  constructor(private _bookingRepository: IBookingRepository) {}

  async execute(bookingId: string): Promise<any> {
    try {
      const booking = await this._bookingRepository.findBooking(bookingId);
      await this._bookingRepository.cancelBooking(bookingId);

      if (booking) {
        publishRefundMessage({
          userId: booking.userId,
          amount: booking.amount,
          transactionType : 'credit',
          date: new Date().toISOString()
        });
      } else {
        return { success: false };
      }

      return { success: true };
    } catch (error) {
      throw new Error("Internal server error: ");
    }
  }
}
