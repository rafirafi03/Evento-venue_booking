import { IRatingData } from "../entities";
import { ICompanyRepository } from "../repositories";

export class GetUserReviewsUseCase {
  constructor(private _companyRepository: ICompanyRepository) {}

  async execute(userId: string): Promise<IRatingData[]> {
    try {
      const response = await this._companyRepository.getUserReviews(userId);


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
