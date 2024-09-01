import { IUserRepository } from "../repositories";
import { IRedisClient } from "../repositories/interfaces/redisInterface";
import User from "../infrastructure/db/models/userModel";
import { hashPass } from "../utils";

interface data {
    otp: string;
    userName: string;
    email: string;
    phone: number;
    password: string;
}


export class VerifyOtpUsecase {
    constructor(
        private verifyOtpRepository: IRedisClient,
        private userRepostitory: IUserRepository
    ) {}

    async execute({
        otp,
        userName,
        email,
        phone,
        password
    }:data) : Promise<any> {
        if(!otp) {
            throw new Error('Invalid otpaaaaa')
        }

        const userOtp = await this.verifyOtpRepository.getOTP(email)

        if(userOtp !== otp) {
            throw new Error('Invalid otp not matching')
        }

        await this.verifyOtpRepository.deleteOTP(email);

        console.log(password,"passsverifyhash")

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

