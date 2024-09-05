import { Company, ICompanyData } from "../../entities";
import { ICompany } from "../../infrastructure/db";


export interface ICompanyRepository {
    findByEmail(email:string) : Promise<ICompany | null>
    save(company: Company) : Promise<ICompanyData | null>
}