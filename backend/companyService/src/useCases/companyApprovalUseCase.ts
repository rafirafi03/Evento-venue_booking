import { ICompanyRepository } from "../repositories";
import { VerificationStatus } from "../infrastructure/db";

export class CompanyApprovalUseCase {
    constructor(
        private _companyRepository : ICompanyRepository
    ) {}

    async execute(approval: string, userId: string) : Promise<{success: boolean}> {
        try {
            console.log(approval,"approval in cpmyusecase")
            const company = await this._companyRepository.findById(userId)

            console.log(company, "companyusecase")
            if(!company) {
                return { success: false } 
            }
            if(approval == 'accept') {
                company.isVerified = VerificationStatus.Verified
            } else {
                company.isVerified = VerificationStatus.Rejected
            }

            await company.save()

            return { success: true} 
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error'+ error)
        }
    }
}