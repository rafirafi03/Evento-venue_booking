import { IUserRepository,RedisClient } from '../repositories'
import { otpService } from '../infrastructure/services';

// import { BadRequestError } from 'evento-library';


export class SignupUseCase {
    constructor(
        private _userRepository : IUserRepository,
        private _redisRepository : RedisClient,
        private _otpRepository : otpService,
    ) {}

    async execute (email:string) : Promise<{success: boolean}> {

        try {
            console.log(email,"emaillllllllllllllllllllllllll")
            if(!email) {
                throw new Error('Invalid input emaillllll')
            }
    
            const existingEmail = await this._userRepository.findByEmail(email);
    
            if(existingEmail) {
                throw new Error("user email already exists")
            }
    
            const otp = this._otpRepository.generateOtp(4);
    
            const subject = 'Your OTP Code';
            const message = otp;
            
            await this._otpRepository.sendMail(email, subject, message);
            await this._redisRepository.storeOTP(email, otp, 300);
    
            return { success: true} 
        } catch (error) {
            throw new Error("error"+error)
        }
        
    }
}