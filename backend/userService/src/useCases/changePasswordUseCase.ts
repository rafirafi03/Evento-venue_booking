import { IRedisClient, IUserRepository } from "../repositories";
import { hashPass } from "../utils";

export class ChangePasswordUseCase {
  constructor(
    private _userRepository: IUserRepository,
    private _redisRepository: IRedisClient
  ) {}

  async execute(
    token: string,
    password: string
  ): Promise<{ success: boolean } | undefined> {
    try {
      if (!token || !password) {
        throw new Error("Invalid input");
      }

      const email = await this._redisRepository.get(token);

      if (!email) {
        throw new Error("Invalid or expired token");
      }

      const hashedPassword = await hashPass(password);

      const user = await this._userRepository.findByEmail(email);

      if (!user) {
        throw new Error("invalid user");
      }

      user.password = hashedPassword;

      await this._userRepository.save(user);

      await this._redisRepository.delete(token);

      return { success: true };
    } catch (error) {
      console.log(error);
    }
  }
}
