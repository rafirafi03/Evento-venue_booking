import { TokenService } from "evento-library";
import bcrypt from "bcrypt";
import { IUserRepository } from "../repositories";
import { ILoginResponse } from "./interfaces";

export class UserLoginUseCase {
  constructor(private _userRepository: IUserRepository) {}

  async execute(
    email: string,
    password: string
  ): Promise<ILoginResponse | null> {
    try {
      const secretKey = process.env.JWTSECRETKEY as string;
      const tokenTimer = process.env.TOKEN_TIMER as string;
      const refreshTokenTimer = process.env.REFRESH_TOKEN_TIMER as string

      const user = await this._userRepository.findByEmail(email);

      console.log(user,"userrerere")
      

      if (user) {

        if(user.isBlocked) {
          return {success: false, error: 'this account is blocked by admin'}
        }
        const pass = await bcrypt.compare(password, user.password as string);
        console.log(pass,"passsss")

        if (!pass) {
          return {success: false, error: 'incorrect password entered'}
        } else {
          const tokenservice = new TokenService(secretKey);

          const token = tokenservice.generateToken({
            userId: user._id as string,
            role: 'user',
          }, tokenTimer);

          const refreshToken = tokenservice.generateToken({
            userId: user._id as string,
            role: 'user'
          }, refreshTokenTimer)

          return { success: true, token, refreshToken };
        }
      }

      return null;
    } catch (error) {
      console.log(error);
      return { success: false, error: 'error occured' }
    }
  }
}