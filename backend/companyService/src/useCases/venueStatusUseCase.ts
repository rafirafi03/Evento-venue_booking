import { ICompanyRepository } from "../repositories";

export class VenueStatusUseCase {
    constructor(
        private _companyRepository : ICompanyRepository
    ) {}

    async execute(id: string) : Promise<{success: boolean}> {
        try {
            const venue = await this._companyRepository.findVenueById(id)

            console.log(venue, "venueusecase")
            if(!venue) {
                return { success: false } 
            }
            if(venue.isListed) {
                venue.isListed = false
            } else {
                venue.isListed = true
            }

            await venue.save()

            return { success: true} 
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error'+ error)
        }
    }
}