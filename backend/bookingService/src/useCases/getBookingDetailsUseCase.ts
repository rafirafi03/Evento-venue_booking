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

      console.log(id," id in bokingddetails use case")
        const booking = await this._bookingRepository.getBookingDetails(id);

        console.log(booking," bookingg venueid. there is no ot")
        
        if (booking && booking.venueDetails && booking.venueDetails.image) {

          console.log('inside is okkkkkkkkkkkkkkk')
          // Generate the signed URL for the image
          const imageUrl = await generateSignedUrl(booking?.venueDetails?.image);
          console.log(imageUrl," iamgeurllllll")

          console.log(booking.venueDetails,"booking venuedetailsssssss")
  
          return {
            ...booking,
            venueDetails: {
              ...booking.venueDetails,
              image: imageUrl,  
            },
          };
        }

        console.log(booking," booking hurekaaaaaaa")

        return booking  

    } catch (error) {
      throw new Error("Internal server error: ");
    }
  }
}
