import { ICompanyRepository } from "../repositories";
import { IVenue } from "../infrastructure/db";

export class GetVenueDetailsUseCase {
    constructor (
        private _companyRepository: ICompanyRepository
    ) {}

    async execute(id:string) : Promise< IVenue | null> {

        try {
            const venue = await this._companyRepository.findVenueById(id)

            console.log(venue,"cmpniessss cmpnyusecase")

            if(!venue) {
                return null
            } else {
                return venue
            } 
        } catch (error) {
            throw new Error("Error" + error)
        }
        
    }
}