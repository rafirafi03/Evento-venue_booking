import { IUserRepository,IRedisClient } from '../repositories'
import { otpService } from '../infrastructure/services';


export class SignupUseCase {
    constructor(
        private _userRepository : IUserRepository,
        private _redisRepository : IRedisClient,
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
                console.log('already exists')
                return { success: false };
            }
    
            const otp = this._otpRepository.generateOtp(4);
    
            const subject = 'Your OTP Code';
            const message = otp;
            
            await this._otpRepository.sendMail(email, subject, message);
            await this._redisRepository.store(email, otp, 300);
    
            return { success: true} 
        } catch (error) {
            throw new Error("error"+error)
        }
        
    }
}