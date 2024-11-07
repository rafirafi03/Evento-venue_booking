import { ICompanyRepository } from "../repositories";
import { ICompany } from "../infrastructure/db";

export class GetCompaniesUseCase {
    constructor (
        private _companyRepository: ICompanyRepository
    ) {}

    async execute() : Promise<{ companies: ICompany[] } | null> {

        try {
            const companies = await this._companyRepository.getCompanies()

            if(!companies || companies.length === 0) {
                return null
            } else {
                return { companies }
            } 
        } catch (error) {
            throw new Error("Error" + error)
        }
        
    }
}