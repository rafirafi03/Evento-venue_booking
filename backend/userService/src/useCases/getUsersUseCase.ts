import { IAdminRepository } from "../repositories/interfaces/adminInterface";
import { IUser } from "../repositories/interfaces/userInterface";


export class GetUsersUseCase {
    constructor (
        private _adminRepository: IAdminRepository
    ) {}

    async execute() : Promise<{ users: IUser[] } | null> {

        try {
            const users = await this._adminRepository.getUsers()

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