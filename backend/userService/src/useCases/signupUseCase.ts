import { IUserRepository,RedisClient } from '../repositories'
import { otpService } from '../infrastructure/services';

// import { BadRequestError } from 'evento-library';


export class SignupUseCase {
    constructor(
        private userRepository : IUserRepository,
        private redisRepository : RedisClient,
        private otpRepository : otpService,
    ) {}

    async execute (email:string) : Promise<any> {
        if(!email) {
            throw new Error('Invalid input')
        }

        const existingEmail = await this.userRepository.findByEmail(email);

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