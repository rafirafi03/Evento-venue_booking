import { ICompanyRepository } from "../repositories";
import { IVenue } from "../infrastructure/db";

export class GetListedVenuesUseCase {
    constructor (
        private _companyRepository: ICompanyRepository
    ) {}

    async execute() : Promise<{ venues: IVenue[] } | null> {

        try {
            const venues = await this._companyRepository.getListedVenues()

            console.log(venues,"cmpniessss cmpnyusecase")

            if(!venues || venues.length === 0) {
                return null
            } else {
                return { venues }
            } 
        } catch (error) {
            throw new Error("Error" + error)
        }
        
    }
}