import { IUserRepository } from "../repositories";
import axios from "axios";

export class AddToFavouritesUseCase {
  constructor(private _userRepository: IUserRepository) {}

  async execute(
    userId: string,
    venueId: string
  ): Promise<{ success: boolean }> {
    try {
      if (!userId || !venueId) {
        throw new Error("Id not found");
      }

        const venueDetails = await axios.get(
          `https://www.eventobooking.site/getVenueDetails/${venueId}`
        );

        console.log(venueDetails.data, "venuedetails in usecase favourties");

        const { name, address, images } = venueDetails.data;

        const venueImage = images?.[0];

        console.log(venueImage, "venueImage");

        const favouritesData = {
          userId,
          venueId,
          venueName: name,
          venueAddress: address,
          venueImage,
        };

        await this._userRepository.saveFavourites(favouritesData);
        console.log(favouritesData, "fvritesdata in usecase");

      return { success: true };
    } catch (error) {
      throw new Error("error" + error);
    }
  }
}
