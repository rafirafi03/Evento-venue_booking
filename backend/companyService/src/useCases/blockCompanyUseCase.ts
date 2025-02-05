import { ICompanyRepository } from "../repositories";

export class BlockCompanyUseCase {
    constructor(
        private _companyRepository : ICompanyRepository
    ) {}

    async execute(id: string) : Promise<{success: boolean}> {
        try {
            const company = await this._companyRepository.findById(id)
            const venueByCompany = await this._companyRepository.findVenueByCompanyId(id)

            if(!company) {
                return { success: false } 
            }
            if(company.isBlocked) {
                company.isBlocked = false
            } else {
                company.isBlocked = true
            }

            if(!venueByCompany) return {success: false}

            for (const venue of venueByCompany) {
                venue.isCompanyBlocked = !venue.isCompanyBlocked; 
                await venue.save(); 
            }

            await company.save()

            return { success: true} 
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error'+ error)
        }
    }
}