import { Company, ICompanyData, IVenueData, Venue } from "../../entities";
import { ICompany, IVenue } from "../../infrastructure/db";


export interface ICompanyRepository {
    findByEmail(email:string) : Promise<ICompany | null>
    findById(_id: string) : Promise<ICompany | null>
    save(company: Company) : Promise<ICompanyData | null>
    getRequests() : Promise<ICompany[]>
    getCompanies() : Promise<ICompany[]>
    addVenue(venue: Venue) : Promise<IVenueData | null>
    getVenues(companyId: string) : Promise<IVenue[]>
    getListedVenues() : Promise<IVenue[]>
    findVenueById(_id: string) : Promise<IVenue | null>
    updateVenue(venueId: string, venueData: any): Promise<void>;
    deleteVenue(venueId: string) : Promise<void>
    findCompanyById(companyId: string) : Promise<ICompany | null>
    editCompanyProfile(companyId: string, companyData: Partial<ICompany> | null) : Promise<void>
    findVenueByCompanyId(id: string) : Promise<IVenue[] | null>
}