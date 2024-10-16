import { IUserRepository } from "../repositories";

export class EditUserProfileUseCase {
    constructor(
        private _userRepository: IUserRepository
    ){}

    async execute({id, userName}: {id: string, userName: string}) : Promise<{success: boolean}>{
        try {
            const user = await this._userRepository.findById(id)

            if (!user) {
                throw new Error("User not found.");
              }

              user.userName = userName
              await this._userRepository.save(user)

              return {success: true}
        } catch (error) {
            console.error(error);
            return { success: false };
        }
    }
}