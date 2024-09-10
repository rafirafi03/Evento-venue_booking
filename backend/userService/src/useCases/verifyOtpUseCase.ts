import { IUserRepository } from "../repositories";
import { IRedisClient } from "../repositories/interfaces/redisInterface";
import User from "../infrastructure/db/models/userModel";
import { hashPass } from "../utils";
import { TokenService } from 'evento-library';
import dotenv from 'dotenv';
import { IOtpData } from "./interfaces";

dotenv.config()

export class VerifyOtpUsecase {
  constructor(
    private _verifyOtpRepository: IRedisClient,
    private _userRepository: IUserRepository
  ) {}

  async execute({ otp, userName, email, phone, password }: IOtpData): Promise<{success: boolean; token?: string; error?: string}> {

    try {
      
      const secretKey = process.env.JWTSECRETKEY as string
  
      if (!otp) {
        throw new Error("Invalid otpaaaaa");
      }
  
      const userOtp = await this._verifyOtpRepository.getOTP(email);
  
      if (userOtp !== otp) {
        return { success: false, error: 'Invalid otp'}
      }
  
      await this._verifyOtpRepository.deleteOTP(email);
  
      console.log(password, "passsverifyhash");
  
      const hashedPass = await hashPass(password);
  
      const user = new User({
        userName,
        email,
        phone,
        password: hashedPass,
      });
  
      await this._userRepository.save(user);
  
      const tokenservice = new TokenService(secretKey)
  
      const token = tokenservice.generateToken({userId: user._id as string, email: user.email})
  
      console.log(token,"tknnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
  
      return { success: true, token };
    } catch (error) {
      console.log(error)
      throw new Error("error" + error)
    }

  }
}
