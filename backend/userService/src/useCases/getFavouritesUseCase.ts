import { IFavouritesData } from "../entities";
import { IUserRepository } from "../repositories/interfaces/userInterface";


export class GetFavouritesUseCase {
    constructor (
        private _userRepository: IUserRepository
    ) {}

    async execute(userId: string) : Promise< IFavouritesData[] | null> {

        try {
            console.log(userId," userid in favrts get use case")
            const favourites = await this._userRepository.getFavouritesByUserId(userId)

            return favourites || null
        } catch (error) {
            throw new Error("Error" + error)
        }
        
    }
}