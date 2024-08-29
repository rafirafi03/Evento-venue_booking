import {BadRequestError} from 'tune-up-library'
import { IUserRepository } from '../repositories'
import { otpService } from '../infrastructure/services';

export class SignupUseCase {
    constructor(
        private userRepository : IUserRepository,
        private otpRepository : otpService,
    ) {}

    async execute (email:string) : Promise<any> {
        if(!email) {
            throw new BadRequestError('Invalid input')
        }

        const existingEmail = await this.userRepository.findByEmail(email);

        if(existingEmail) {
            throw new BadRequestError("user email already exists")
        }

        const otp = this.otpRepository.generateOtp(4);

        const subject = 'Your OTP Code';
        const message = otp;
        console.log(message,"messageeeeeeeeee")
        await this.otpRepository.sendMail(email, subject, message);
        // await this.redisRepository.store(email, otp, 300);

        return { success: true}
    }
}