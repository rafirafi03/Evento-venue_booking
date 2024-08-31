import { IUserRepository } from "../repositories";
import { IRedisClient } from "../repositories/interfaces/redisInterface";
import User from "../infrastructure/db/models/userModel";
import { hashPass } from "../utils";


export class VerifyOtpUsecase {
    constructor(
        private verifyOtpRepository: IRedisClient,
        private userRepostitory: IUserRepository
    ) {}

    async execute(
        otp: string,
        email: string,
        phone: number,
        userName: string,
        password: string
    ) : Promise<any> {
        if(!otp) {
            throw new Error('Invalid otp')
        }

        const userOtp = await this.verifyOtpRepository.getOTP(email)

        if(userOtp !== otp) {
            throw new Error('Invalid otp')
        }

        await this.verifyOtpRepository.deleteOTP(email);

        const hashedPass = await hashPass(password);

        const user = new User({
            userName,
            email,
            phone,
            password: hashedPass,
        })

        await this.userRepostitory.save(user)

        return { success: true}

        
    }
}

