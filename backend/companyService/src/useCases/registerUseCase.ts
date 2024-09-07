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
        private _companyRepository : ICompanyRepository,
        private _otpRepository : otpService,
        private _redisRepository : RedisClient
    ) {}

    async execute(email : string) : Promise<any> {

        if(!email) {
            throw new Error('Invalid input emaillllll')

        }

        const existingEmail = await this._companyRepository.findByEmail(email);

        if(existingEmail) {
            throw new Error("user email already exists")
        }
        
        const otp = this._otpRepository.generateOtp(4);

        const subject = 'Your OTP Code';
        const message = otp;
        
        await this._otpRepository.sendMail(email, subject, message);
        await this._redisRepository.storeOTP(email, otp, 300);

        return { success: true}
        
    }
}