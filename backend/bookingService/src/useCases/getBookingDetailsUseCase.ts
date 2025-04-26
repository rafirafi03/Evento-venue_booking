import { IBookingRepository } from "../repositories/interfaces";

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
  
          return booking
        }

        return booking  

    } catch (error) {
      throw new Error("Internal server error: ");
    }
  }
}
