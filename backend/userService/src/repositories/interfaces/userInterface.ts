import { IUser } from "../../infrastructure/db";
import { IUserData, User, Favourites, IFavouritesData  } from '../../entities'

export interface IUserRepository {
    findByEmail(email: string): Promise<IUser | null>
    save(user:User) : Promise<IUserData | null>
    findById(id: string) : Promise<IUser | null>
    saveFavourites(favouritesData : Favourites)  : Promise<IFavouritesData | null>
    checkFavourites(userId: string, venueId: string) : Promise<boolean>
    deleteFromFavourites(userId: string, venueId: string) : Promise<void>
    getFavouritesByUserId(userId: string) : Promise<IFavouritesData[]>
}

export { IUser };
