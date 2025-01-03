import { IAdminRepository } from "../repositories/interfaces/adminInterface";
import { IUser } from "../repositories/interfaces/userInterface";


export class GetUsersUseCase {
    constructor (
        private _adminRepository: IAdminRepository
    ) {}

    async execute(search: string) : Promise<{ users: IUser[] } | null> {

        try {
            console.log(search,"search in useCase")
            let users = await this._adminRepository.getUsers()

            if(search) {
                console.log('search true')
                users = users.filter((user)=> 
                    user.userName.toLowerCase().includes(search.toLowerCase())
                )

                console.log(users,"users filter over")
            }

            if(!users || users.length === 0) {
                return null
            } else {
                return { users }
            } 
        } catch (error) {
            throw new Error("Error" + error)
        }
        
    }
}