import { ICompanyRepository } from "../repositories";
import { ICompany } from "../infrastructure/db";
import { generateSignedUrl } from "../utils";

export class GetRequestsUseCase {
    constructor (
        private _companyRepository: ICompanyRepository
    ) {}

    async execute() : Promise<{ requests: ICompany[] } | null> {

        try {
            const requests = await this._companyRepository.getRequests()

            if(!requests || requests.length === 0) {
                return null
            }
            for (const req of requests) {
                req.license = await generateSignedUrl(req.license); 
            }
                return { requests }
        } catch (error) {
            throw new Error("Error" + error)
        }
        
    }
}