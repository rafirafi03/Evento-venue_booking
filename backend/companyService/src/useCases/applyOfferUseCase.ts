import { ICompanyRepository } from "../repositories";

export class ApplyOfferUseCase {
    constructor(
        private _companyRepository : ICompanyRepository
    ) {}

    async execute(venueId: string, offerId: string) : Promise<{success: boolean}> {
        try {
            const venue = await this._companyRepository.findVenueById(venueId)

            if(!venue) {
                return { success: false } 
            }

                venue.offerId = offerId

                await venue.save(); 

                return { success: true} 
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error'+ error)
        }
    }
}