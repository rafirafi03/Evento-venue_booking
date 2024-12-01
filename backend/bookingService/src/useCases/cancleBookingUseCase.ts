import { IBookingRepository } from "../repositories/interfaces";
import { publishRefundMessage } from "../infrastructure/messaging/publisher";

export class CancelBookingUseCase {
  constructor(private _bookingRepository: IBookingRepository) {}

  async execute(bookingId: string): Promise<any> {
    try {
      const booking = await this._bookingRepository.findBooking(bookingId);

      if (booking) {

        booking.status = 'cancelled'
        await this._bookingRepository.save(booking);
        
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
