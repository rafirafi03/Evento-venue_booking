import { ICompanyRepository } from "../repositories";

export class DeleteOfferUseCase {
  constructor(private _companyRepository: ICompanyRepository) {}

  async execute(offerId: string): Promise<{ success: boolean }> {
    try {
      await this._companyRepository.deleteOffer(offerId);

      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }
}
