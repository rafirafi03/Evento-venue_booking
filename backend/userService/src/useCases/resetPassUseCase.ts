import { IUserRepository } from "../repositories";
import { verifyPass, hashPass } from "../utils";

export class ResetPasswordUseCase {
  constructor(private _userRepository: IUserRepository) {}

  async execute({
    id,
    currPass,
    newPass,
  }: {
    id: string;
    currPass: string;
    newPass: string;
  }): Promise<{ success: boolean }> {
    try {
      const user = await this._userRepository.findById(id);

      if (!user) {
        throw new Error("User not found.");
      }

      const isPasswordValid = await verifyPass(
          currPass,
          user.password as string
      );
      if(!isPasswordValid) {
        throw new Error('invalid password')

      }

      const hashedPassword = await hashPass(newPass);

      user.password = hashedPassword
      await this._userRepository.save(user);


      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false }; 
    }
  }
}
