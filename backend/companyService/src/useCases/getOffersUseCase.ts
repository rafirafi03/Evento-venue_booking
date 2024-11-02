import { ICompanyRepository } from "../repositories";
import { IOffer } from "../infrastructure/db";

export class GetOffersUseCase {
    constructor (
        private _companyRepository: ICompanyRepository
    ) {}

    async execute(companyId: string) : Promise< IOffer[] | null> {

        try {
            const offers = await this._companyRepository.getOffers(companyId)

            console.log(offers,"cmpniessss cmpnyusecase")

            if(!offers || offers.length === 0) {
                return null
            } else {
                return offers
            } 
        } catch (error) {
            throw new Error("Error" + error)
        }
        
    }
}