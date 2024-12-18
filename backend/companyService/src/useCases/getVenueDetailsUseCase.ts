import { ICompanyRepository } from "../repositories";
import { IVenue } from "../infrastructure/db";
import { generateSignedUrl } from "../utils";

export class GetVenueDetailsUseCase {
  constructor(private _companyRepository: ICompanyRepository) {}

  async execute(id: string): Promise<IVenue | null> {
    try {
      const venueDoc = await this._companyRepository.findVenueById(id);

      if (!venueDoc) return null;

      const venue = venueDoc.toObject();

      console.log(venue, "cmpniessss cmpnyusecase");

      if (!venue) {
        return null;
      } else {
        const imageUrls = await Promise.all(
            venue.images.map(async (imageKey: string) => await generateSignedUrl(imageKey))
          );

        console.log(imageUrls,"imageurlsss")

        // Return the venue details with the full S3 URLs for the images
        return {
          ...venue, // Spread the original venue object
          images: imageUrls, // Attach the full image URLs to the images field
        };
      }
    } catch (error) {
      throw new Error("Error" + error);
    }
  }
}
