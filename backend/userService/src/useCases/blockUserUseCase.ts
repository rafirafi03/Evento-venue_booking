import { IUserRepository } from "../repositories";


export class BlockUserUseCase {
    constructor(
        private _userRepository : IUserRepository
    ) {}

    async execute(id : string) : Promise<{success: boolean}> {
        try {

            console.log(id, "iduserusecasessssss")
            const user = await this._userRepository.findById(id)

            console.log(user, "userusecasessssssss")
            if(!user) {
                return { success: false } 
            }
            if(user.isBlocked) {
                user.isBlocked = false
            } else {
                user.isBlocked = true
            }

            await user.save()

            return { success: true}
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error'+ error)
        }
    }
}