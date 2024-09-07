import { IUserRepository } from "../repositories";
import { IRedisClient } from "../repositories/interfaces/redisInterface";
import User from "../infrastructure/db/models/userModel";
import { hashPass } from "../utils";
import { TokenService } from 'evento-library';
require('dotenv').config()

interface data {
  otp: string;
  userName: string;
  email: string;
  phone: number;
  password: string;
}

export class VerifyOtpUsecase {
  constructor(
    private _verifyOtpRepository: IRedisClient,
    private _userRepostitory: IUserRepository
  ) {}

  async execute({ otp, userName, email, phone, password }: data): Promise<any> {

    const secretKey = process.env.JWTSECRETKEY as string

    if (!otp) {
      throw new Error("Invalid otpaaaaa");
    }

    const userOtp = await this._verifyOtpRepository.getOTP(email);

    if (userOtp !== otp) {
      throw new Error("Invalid otp not matching");
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

    await this._userRepostitory.save(user);

    const tokenservice = new TokenService(secretKey)

    const token = tokenservice.generateToken({userId: user._id as string, email: user.email})

    console.log(token,"tknnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")

    return { success: true, token };
  }
}
