import { IUserRepository } from "../repositories";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
import { User } from "../entities";
import { TokenService } from "evento-library";
import { ILoginResponse } from "./interfaces";
dotenv.config();

export class GoogleAuthUseCase {
  constructor(private _userRepository: IUserRepository) {}

  async execute(googleToken: string): Promise<ILoginResponse | null> {
    try {

        console.log(googleToken,"googleToken")
      const googleClientId = process.env.GOOGLE_AUTH_CLIENT_ID as string;
      const client = new OAuth2Client(googleClientId);
      const secretKey = process.env.JWTSECRETKEY as string
      const tokenTimer = process.env.TOKEN_TIMER as string;
      const refreshTokenTimer = process.env.REFRESH_TOKEN_TIMER as string 

      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: googleClientId,
      });
      const payload = ticket.getPayload();

      if (!payload) {
        return {success: false}
      }

      const { sub: googleId, email, name, picture } = payload;

      console.log(picture,"picturerererer")

      const user = await this._userRepository.findByEmail(email as string);

      let token;
      let refreshToken;

      if (user) {

        if(!user.isBlocked) {

            const tokenservice = new TokenService(secretKey);
    
            token = tokenservice.generateToken({
              userId: user._id,
              role: 'user',
            }, tokenTimer);
    
            refreshToken = tokenservice.generateToken({
              userId: user._id,
              role: 'user'
            }, refreshTokenTimer)
        }

      } else {
        const user = new User({
            googleId,
            userName: name as string,
            email : email as string,
            image: picture
        });

        const savedUser = await this._userRepository.save(user);

        const tokenservice = new TokenService(secretKey);

        token = tokenservice.generateToken(
          {
            userId: savedUser?._id as string,
            role: "user",
          },
          tokenTimer
        );

        refreshToken = tokenservice.generateToken(
          {
            userId: savedUser?._id as string,
            role: "user",
          },
          refreshTokenTimer
        );

      }

      return { success: true, token, refreshToken };


    } catch (error) {
      throw new Error("error" + error);
    }
  }
}
