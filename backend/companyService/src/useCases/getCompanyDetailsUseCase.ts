import { ICompanyRepository } from "../repositories";
import { ICompany } from "../infrastructure/db";
import { generateSignedUrl } from "../utils";

export class GetCompanyDetailsUseCase {
    constructor (
        private _companyRepository: ICompanyRepository
    ) {}

    async execute(id:string) : Promise< ICompany | null> {

        try {
            const company = await this._companyRepository.findCompanyById(id)

            
            if(!company) {
                return null
            } else {
                const signedUrl = await generateSignedUrl(company?.license)
                company.license = signedUrl
                return company
            } 
        } catch (error) {
            throw new Error("Error" + error)
        }
        
    }
}