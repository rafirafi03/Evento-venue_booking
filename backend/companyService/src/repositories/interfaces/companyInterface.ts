import { Company, ICompanyData } from "../../entities";


export interface ICompanyRepository {
    save(company: Company) : Promise<ICompanyData | null>
}