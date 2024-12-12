import { IRatingData } from "../entities";
import { ICompanyRepository } from "../repositories";

export class GetReviewsUseCase {
  constructor(private _companyRepository: ICompanyRepository) {}

  async execute(venueId: string): Promise<IRatingData[]> {
    try {
        console.log(venueId,"venueidddddd")
      const response = await this._companyRepository.getReviews(venueId);

      console.log(response,"response in usecaseess")

      if(!response.length) {
        return []
      }

      return response

    } catch (error) {
      console.log(error);
      throw new Error("Error" + error)
    }
  }
}
