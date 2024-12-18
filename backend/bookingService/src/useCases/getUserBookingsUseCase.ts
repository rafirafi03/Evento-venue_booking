import { IBookingRepository } from "../repositories/interfaces";
import { generateSignedUrl } from "../utils";

export class GetUserBookingsUseCase {
  constructor(
    private _bookingRepository: IBookingRepository
  ) {}

  async execute(
    userId: string,
  ): Promise<any> {
    try {
      const bookings = await this._bookingRepository.getBookingsByUserId(userId);

      if (!bookings) {
        return [];
      } else {
        return await Promise.all(
          bookings.map(async (venue) => {
            // Ensure you're accessing the correct nested image field
            const signedUrl = await generateSignedUrl(venue.venueDetails?.image || "");

            return {
              ...venue,
              venueDetails: {
                ...venue.venueDetails,
                image: signedUrl,  // Replace the image path with the signed URL
              },
            };
          })
        );
      }

    } catch (error: any) {
      throw new Error("Internal server error: " + error.message);
    }
  }
}
