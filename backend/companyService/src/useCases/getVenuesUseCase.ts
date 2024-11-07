import { ICompanyRepository } from "../repositories";
import { IVenue } from "../infrastructure/db";

export class GetVenuesUseCase {
    constructor (
        private _companyRepository: ICompanyRepository
    ) {}

    async execute(companyId: string) : Promise<{ venues: IVenue[] } | null> {

        try {
            const venues = await this._companyRepository.getVenues(companyId)

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