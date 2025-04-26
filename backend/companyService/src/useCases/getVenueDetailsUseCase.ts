import { ICompanyRepository } from "../repositories";
import { IVenue } from "../infrastructure/db";

export class GetVenueDetailsUseCase {
  constructor(private _companyRepository: ICompanyRepository) {}

  async execute(id: string): Promise<IVenue | null> {
    try {
      const venueDoc = await this._companyRepository.findVenueById(id);

      console.log("venueeeeeDovvvvvc 1234 : " , venueDoc)
      if (!venueDoc) return null;

      const venue = venueDoc.toObject();

      console.log("venueeeee 1234 : " , venue)

      if (!venue) {
        return null;
      } else {

        // Return the venue details with the full S3 URLs for the images
        return venue // Attach the full image URLs to the images field
      }
    } catch (error) {
      throw new Error("Error" + error);
    }
  }
}
