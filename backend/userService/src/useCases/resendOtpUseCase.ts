import { otpService } from "../infrastructure/services";
import { RedisClient } from "../repositories";



export class ResendOtpUseCase {
    constructor(
        private _otpRepository : otpService,
        private _redisRepository : RedisClient
    ) {}

    async execute (email: string) : Promise<{success: boolean}> {

        try {
            const otp = this._otpRepository.generateOtp(4)

            const subject = 'Your OTP Code';
            const message = otp

            await this._otpRepository.sendMail(email, subject, message);
            await this._redisRepository.store(email, otp, 300)

            return { success: true }    
        } catch (error) {
            throw new Error("error" + error)
        }
    }
}