import { IUserRepository } from "../repositories";

export class DeleteFromFavouritesUseCase {
    constructor(
        private _userRepository: IUserRepository
    ) {}

    async execute(userId: string, venueId: string) : Promise<{success: true}> {
        try {
            await this._userRepository.deleteFromFavourites(userId, venueId)

            return {success: true}
        } catch (error) {
            throw new Error('failed to delete'+ error)
        }
    }
}