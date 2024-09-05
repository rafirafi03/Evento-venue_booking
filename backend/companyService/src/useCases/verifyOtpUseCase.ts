import { ICompanyRepository } from "../repositories";
import { IRedisClient } from "../repositories/interfaces/redisInterface";
import Company from "../infrastructure/db/models/companyModel";
import { hashPass } from "../utils";
import { TokenService } from 'evento-library';
require('dotenv').config()

interface data {
  otp: string;
  name: string;
  email: string;
  phone: number;
  country: string;
  password: string;
}

export class VerifyOtpUsecase {
  constructor(
    private verifyOtpRepository: IRedisClient,
    private companyRepostitory: ICompanyRepository
  ) {}

  async execute({ otp, name, email, phone, country, password }: data): Promise<any> {

    const secretKey = process.env.JWTSECRETKEY as string

    if (!otp) {
      throw new Error("Invalid otpaaaaa");
    }

    const userOtp = await this.verifyOtpRepository.getOTP(email);

    if (userOtp !== otp) {
      throw new Error("Invalid otp not matching");
    }

    await this.verifyOtpRepository.deleteOTP(email);

    console.log(password, "passsverifyhash");

    const hashedPass = await hashPass(password);

    const user = new Company({
      name,
      email,
      phone,
      country,
      password: hashedPass,
    });

    await this.companyRepostitory.save(user);

    const tokenservice = new TokenService(secretKey)

    const token = tokenservice.generateToken({userId: user._id as string, email: user.email})

    return { success: true, token };
  }
}
