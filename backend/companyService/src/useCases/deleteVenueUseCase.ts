import { ICompanyRepository } from "../repositories";

export class DeleteVenueUseCase {
  constructor(private _companyRepository: ICompanyRepository) {}

  async execute(venueId: string): Promise<{ success: boolean }> {
    try {
      await this._companyRepository.deleteVenue(venueId);

      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }
}
