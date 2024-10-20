import { IUserRepository } from '../repositories'


export class CheckFavouritesUseCase {
    constructor(
        private _userRepository : IUserRepository,
    ) {}

    async execute (userId:string, venueId: string) : Promise<boolean> {

        try {

            console.log(userId,venueId,"user adn venueid in use case")

            const isFavorited = await this._userRepository.checkFavourites(userId, venueId)
    
            return isFavorited
            
        } catch (error) {
            throw new Error("error"+error)
        }
        
    }
}