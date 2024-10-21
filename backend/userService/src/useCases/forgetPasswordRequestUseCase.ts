import { IUserRepository } from "../repositories";
import dotenv from 'dotenv'
import { otpService } from "../infrastructure/services";

dotenv.config()


export class ForgetPasswordRequest {
  constructor(
    private _otpRepository: otpService
) {}

  async execute(email: string): Promise<void> {
    try {
      if (!email) {
        throw new Error("Email is required");
      }

      const userUrl = process.env.USERURL

      console.log(userUrl," userurl in use case forget pass")

      const subject = 'click the link to reset you password';
      const message = `click here ${userUrl}/resetPassword`;

      console.log(message, "message in user case forgoy")
      
      await this._otpRepository.sendMail(email, subject, message);

    } catch (error) {
      console.log(error);
      throw new Error("Error: " + error);
    }
  }
}
