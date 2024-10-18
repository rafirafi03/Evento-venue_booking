import { Company, ICompanyData, IVenueData, Venue } from "../../entities";
import { ICompany, IVenue } from "../../infrastructure/db";


export interface ICompanyRepository {
    findByEmail(email:string) : Promise<ICompany | null>
    findById(_id: string) : Promise<ICompany | null>
    save(company: Company) : Promise<ICompanyData | null>
    getRequests() : Promise<ICompany[]>
    getCompanies() : Promise<ICompany[]>
    addVenue(venue: Venue) : Promise<IVenueData | null>
    getVenues() : Promise<IVenue[]>
    getListedVenues() : Promise<IVenue[]>
    findVenueById(_id: string) : Promise<IVenue | null>
    updateVenue(venueId: string, venueData: any): Promise<any>;
    deleteVenue(venueId: string) : Promise<void>
}