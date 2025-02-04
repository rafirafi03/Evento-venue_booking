import { IRedisClient, IUserRepository } from "../repositories";
import dotenv from 'dotenv'
import { otpService } from "../infrastructure/services";
import { TokenService } from "evento-library";

dotenv.config()


export class ForgetPasswordRequest {
  constructor(
    private _otpRepository: otpService,
    private _userRepository: IUserRepository,
    private _redisRepository: IRedisClient
) {}

  async execute(email: string): Promise<{success: boolean}> {
    try {
      if (!email) {
        throw new Error("Email is required");
      }

      const userUrl = process.env.FRONTEND_PORT
      const secretKey = process.env.JWTSECRETKEY as string

      const user = await this._userRepository.findByEmail(email);
      if (!user) {
        throw new Error("User not found");
      }

      const tokenService = new TokenService(secretKey)
      const token = tokenService.generateToken({
        userId: email,
        role: 'forgetPassword'
      });

      await this._redisRepository.store(token, email, 3600);

      const subject = 'click the link to reset you password';
      const message = `click here ${userUrl}/resetPassword/${token}`;
      
      await this._otpRepository.sendMail(email, subject, message);

      return {success: true}

    } catch (error) {
      console.log(error);
      throw new Error("Error: " + error);
    }
  }
}
