import { ICompanyRepository } from "../repositories";
import { IRedisClient } from "../repositories/interfaces/redisInterface";
import Company from "../infrastructure/db/models/companyModel";
import { hashPass } from "../utils";
import { TokenService } from "evento-library";
import dotenv from "dotenv";

dotenv.config();

interface data {
  otp: string;
  name: string;
  email: string;
  phone: number;
  country: string;
  password: string;
  license?: string;
}

export class VerifyOtpUsecase {
  constructor(
    private _verifyOtpRepository: IRedisClient,
    private _companyRepository: ICompanyRepository
  ) {}

  async execute({
    otp,
    name,
    email,
    phone,
    country,
    password,
    license
  }: data): Promise<{ success: boolean; token?: string, error?: string }> {
    try {
      const secretKey = process.env.JWTSECRETKEY as string;

      if (!otp) {
        return { success: false, error: "OTP is required" };
      }

      const companyOtp = await this._verifyOtpRepository.getOTP(email);

      if (companyOtp !== otp) {
        return { success: false, error: "Invalid Otp"}
      }

      await this._verifyOtpRepository.deleteOTP(email);


      const hashedPass = await hashPass(password);

      const company = new Company({
        name,
        email,
        phone,
        country,
        password: hashedPass,
        license: license
      });

      const savedCompany = await this._companyRepository.save(company);

      if (!savedCompany) {
        return { success: false, error: "Error saving company" };
      } else {
        const tokenservice = new TokenService(secretKey);

        const token = tokenservice.generateToken({
          userId: savedCompany._id as unknown as string,
          role: "company",
        });

        return { success: true, token };
      }
    } catch (error) {
      console.log(error);

      throw new Error("error" + error);
    }
  }
}
