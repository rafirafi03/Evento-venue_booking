import { otpService } from "../infrastructure/services";
import { ICompanyRepository, RedisClient } from "../repositories";

interface data {
    name: string;
    email: string;
    phone: number;
    country: string;
    password: string
}

export class RegisterUseCase {
    constructor(
        private companyRepository : ICompanyRepository,
        private otpRepository : otpService,
        private redisRepository : RedisClient
    ) {}

    async execute(email : string) : Promise<any> {

        if(!email) {
            throw new Error('Invalid input emaillllll')

        }

        const existingEmail = await this.companyRepository.findByEmail(email);

        if(existingEmail) {
            throw new Error("user email already exists")
        }
        
        const otp = this.otpRepository.generateOtp(4);

        const subject = 'Your OTP Code';
        const message = otp;
        
        await this.otpRepository.sendMail(email, subject, message);
        await this.redisRepository.storeOTP(email, otp, 300);

        return { success: true}
        
    }
}