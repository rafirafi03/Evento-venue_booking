import { ICompanyRepository } from "../repositories";

export class RemoveOfferUseCase {
    constructor(
        private _companyRepository : ICompanyRepository
    ) {}

    async execute(venueId: string) : Promise<{success: boolean}> {
        try {

            await this._companyRepository.removeOffer(venueId)

            return { success: true} 
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error'+ error)
        }
    }
}