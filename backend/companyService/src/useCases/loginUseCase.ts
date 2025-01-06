import { TokenService } from "evento-library";
import { ICompanyRepository } from "../repositories";
import { ILoginResponse } from "./interfaces";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export class LoginUseCase {
  constructor(private _companyRepository: ICompanyRepository) {}

  async execute(
    email: string,
    password: string
  ): Promise<ILoginResponse | null> {
    try {
      const secretKey = process.env.JWTSECRETKEY as string;
      const tokenTimer = process.env.TOKEN_TIMER as string;
      const refreshTokenTimer = process.env.REFRESH_TOKEN_TIMER as string;

      const company = await this._companyRepository.findByEmail(email);

      console.log(company," companyyyyyyyy6767")

      if (!company) {
        console.log("no company");
        return { success: false, error: "Invalid email" };
      }

      if (company.isVerified == "pending") {
        console.log("not verified");
        return {
          success: false,
          error: "Request is still pending, wait for admin to approve.",
        };
      } else if (company.isVerified == "rejected") {
        return { success: false, error: "Your request has been rejected" };
      } else if (company.isBlocked) {
        return { success: false, error: "this acount is blocked by admin" };
      }

      const pass = await bcrypt.compare(password, company.password);

      console.log(pass, "conpared pass777777")

      if (!pass) {
        console.log('no passssss777777')
        return { success: false, error: "Incorrect password" };
      }

      const tokenService = new TokenService(secretKey);
      const token = tokenService.generateToken(
        {
          userId: company.id as string,
          role: "company",
        },
        tokenTimer
      );

      const refreshToken = tokenService.generateToken(
        {
          userId: company.id as string,
          role: "company",
        },
        refreshTokenTimer
      );

      console.log('return successs777777')

      return { success: true, token, refreshToken };
    } catch (error) {
      console.log(error);
      throw new Error("Error: " + error);
    }
  }
}
