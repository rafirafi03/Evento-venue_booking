import { ICompanyRepository } from "../repositories";
import { Rating } from "../entities/ratingEntity"; 

interface data {
  userId: string;
  venueId: string;
  userName: string;
  userEmail: string;
  star: number;
  review: string
}

export class AddReviewUseCase {
  constructor(private _companyRepository: ICompanyRepository) {}

  async execute({
    userId,
    venueId,
    userName,
    userEmail,
    star,
    review
  }: data): Promise<{ success: boolean }> {
    try {
        const rating = new Rating({
            userId,
            venueId,
            userName,
            userEmail,
            star,
            review
        })

        console.log(rating,"ratingggg in usecaseessesese")

        const response = await this._companyRepository.addRating(rating);
        console.log(response)
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }
}
