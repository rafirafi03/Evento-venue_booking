import { IAdminRepository } from "../repositories/interfaces/adminInterface";


export class GetUsersUseCase {
    constructor (
        private _adminRepository: IAdminRepository
    ) {}

    async execute() : Promise<any> {
        const users = await this._adminRepository.getUsers()

        if(!users) {
            return null
        } else {
            return {users}
        }
    }
}