import { ICompanyRepository } from "../repositories";
import { IVenue } from "../infrastructure/db";
import { constructS3Url } from "../utils";

export class GetVenuesUseCase {
  constructor(private _companyRepository: ICompanyRepository) {}

  async execute(companyId: string): Promise<IVenue[] | null> {
    try {
      const venues = await this._companyRepository.getVenues(companyId);

      if (!venues || venues.length === 0) {
        return null;
      } else {
        return venues.map((venue) => {
          const imageUrls = venue.images.map((imageKey: string) =>
            constructS3Url(imageKey)
          );
          return {
            ...venue.toObject(),
            images: imageUrls,
          };
        });
      }
    } catch (error) {
      throw new Error("Error" + error);
    }
  }
}
