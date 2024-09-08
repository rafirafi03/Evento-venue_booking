import { ICompanyRepository } from "../repositories";
import { IRedisClient } from "../repositories/interfaces/redisInterface";
import Company, { ICompany } from "../infrastructure/db/models/companyModel";
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
  }: data): Promise<{ success: boolean; token: string }> {
    try {
      const secretKey = process.env.JWTSECRETKEY as string;

      if (!otp) {
        throw new Error("Invalid otpaaaaa");
      }

      const companyOtp = await this._verifyOtpRepository.getOTP(email);

      if (companyOtp !== otp) {
        throw new Error("Invalid otp not matching");
      }

      await this._verifyOtpRepository.deleteOTP(email);

      console.log(password, "passsverifyhash");

      const hashedPass = await hashPass(password);

      const company: ICompany = new Company({
        name,
        email,
        phone,
        country,
        password: hashedPass,
      });

      const savedCompany = await this._companyRepository.save(company);

      if (!savedCompany) {
        throw new Error("Error saving company");
      } else {
        const tokenservice = new TokenService(secretKey);

        const token = tokenservice.generateToken({
          userId: savedCompany._id as unknown as string,
          email: savedCompany.email,
        });

        return { success: true, token };
      }
    } catch (error) {
      console.log(error);

      throw new Error("error" + error);
    }
  }
}
