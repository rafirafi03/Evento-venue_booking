import Offer from "../infrastructure/db/models/offerModel";
import { ICompanyRepository } from "../repositories";

interface data {
  companyId: string;
  name: string;
  percentage: number;
  validity: number;
}

export class AddOfferUseCase {
  constructor(private _companyRepository: ICompanyRepository) {}

  async execute({
    companyId,
    name,
    percentage,
    validity
  }: data): Promise<{ success: boolean }> {
    try {
      const offer = new Offer({
        companyId,
        name,
        percentage,
        validity
      });

      console.log(offer,"offer in use case")

      const savedOffer = await this._companyRepository.addOffer(offer);
      console.log(savedOffer);
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }
}
