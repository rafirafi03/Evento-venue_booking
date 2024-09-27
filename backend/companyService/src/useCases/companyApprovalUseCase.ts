import { ICompanyRepository } from "../repositories";
import { VerificationStatus } from "../infrastructure/db";
import { otpService } from "../infrastructure/services";

export class CompanyApprovalUseCase {
    constructor(
        private _companyRepository : ICompanyRepository,
        private _otpRepository : otpService
    ) {}

    async execute(approval: string, userId: string) : Promise<{success: boolean}> {
        try {
            console.log(approval,"approval in cpmyusecase")
            const company = await this._companyRepository.findById(userId)

            let subject;
            let message;

            console.log(company, "companyusecase")
            if(!company) {
                return { success: false } 
            }
            if(approval == 'accept') {
                company.isVerified = VerificationStatus.Verified
                subject = 'Welcome to Evento';
                message = 'Your request has been accepted by admin. please login and continue with evento'
            } else {
                company.isVerified = VerificationStatus.Rejected
                subject = 'Request rejected';
                message = 'Your request has been rejected by admin. please try again with valid credentials'
            }

            await this._otpRepository.sendMail(company.email, subject, message)

            await company.save()

            return { success: true} 
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error'+ error)
        }
    }
}