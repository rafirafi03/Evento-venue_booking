import { IUser, IUserRepository } from "../repositories/interfaces/userInterface";


export class GetUserDetailsUseCase {
    constructor (
        private _userRepository: IUserRepository
    ) {}

    async execute(userId: string) : Promise< IUser | null> {

        try {
            const users = await this._userRepository.findById(userId)

            if(!users) {
                return null
            } else {
                return users
            } 
        } catch (error) {
            throw new Error("Error" + error)
        }
        
    }
}