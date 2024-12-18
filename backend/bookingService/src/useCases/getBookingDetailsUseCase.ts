import { IBookingRepository } from "../repositories/interfaces";
import {generateSignedUrl} from '../utils'

export class GetBookingDetailsUseCase {
  constructor(
    private _bookingRepository: IBookingRepository
  ) {}

  async execute(
    id: string,
  ): Promise<any> {
    try {
        const booking = await this._bookingRepository.getBookingDetails(id);

        console.log(booking," bookingg is boking. there is no ot")

        if (booking && booking.venueDetails && booking.venueDetails.image) {
          // Generate the signed URL for the image
          const imageUrl = await generateSignedUrl(booking.venueDetails.image);
  
          // Return the booking object with the signed image URL included
          return {
            ...booking,
            venueDetails: {
              ...booking.venueDetails,
              image: imageUrl,  // Replace the image with the signed URL
            },
          };
        }

        return booking  

    } catch (error) {
      throw new Error("Internal server error: ");
    }
  }
}
