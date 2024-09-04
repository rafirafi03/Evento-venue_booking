import { IAdminRepository } from "../repositories/interfaces/adminInterface";


export class GetUsersUseCase {
    constructor (
        private adminRepository: IAdminRepository
    ) {}

    async execute() : Promise<any> {
        const users = await this.adminRepository.getUsers()

        if(!users) {
            return null
        } else {
            return {users}
        }
    }
}