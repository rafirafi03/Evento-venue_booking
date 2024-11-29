import { Favourites, IFavouritesData, IUserData, User } from "../../entities";
import { FavouritesModel, IUser, userModel } from "../../infrastructure/db";
import { IUserRepository } from "../interfaces";

export class UserRepository implements IUserRepository {

    async findByEmail(email: string): Promise<IUser | null> {
        try {
            const user = await userModel.findOne({ email });
            if(!user) return null
            return user
        } catch (error) {
            throw new Error('error in DB'+ error)
        }
    }

    async findById(id: string): Promise<IUser | null> {
        try {
            return await userModel.findById(id)
        } catch (error) {
            throw new Error('error in DB'+ error)
        }
    }

    async save(user:User): Promise<IUserData> {
        try {
            const newUser = new userModel(user);
            await newUser.save();
            return newUser as IUserData;
        } catch (error) {
            throw new Error('Error' + error)
        }
    }

    async updateUser(email: string, updatedData: Partial<IUser>): Promise<IUser | null> {
        try {
            const updatedUser = await userModel.findOneAndUpdate(
                { email }, 
                { $set: updatedData }, 
                { new: true, runValidators: true } 
            );
            
            if (!updatedUser) {
                return null; 
            }
    
            return updatedUser;
        } catch (error) {
            throw new Error('Error updating user: ' + error);
        }
    }

    async saveFavourites(favouritesData: Favourites) : Promise<IFavouritesData> {
        try {
            const newFavourites = new FavouritesModel(favouritesData)
            await newFavourites.save()
            return newFavourites.toObject() as IFavouritesData
        } catch (error) {
            throw new Error('Error adding to favourites: ' + error);
        }
    }
    
    async checkFavourites(userId: string, venueId: string): Promise<boolean> {

        try {
            const isFavorited = await FavouritesModel.exists({ userId, venueId });

            console.log(isFavorited,"isfavourtied in repository ")

            return !!isFavorited
        } catch (error) {
            throw new Error('Error fetching favourites: ' + error);
        }
        
    }

    async deleteFromFavourites(userId: string, venueId: string) : Promise<void>{
        try {
            await FavouritesModel.findOneAndDelete({ userId, venueId });
        } catch (error) {
            throw new Error('Error fetching favourites: ' + error);
        }
    }

    async getFavouritesByUserId(userId: string): Promise<IFavouritesData[]> {
        try {
            console.log(userId, " userid in repostry")
            const favourites = await FavouritesModel.find({userId: userId})

            console.log(favourites,"get favrtes in repo ")

            return favourites
        } catch (error) {
            throw new Error('Error fetching favourites: ' + error);
        }
    }

    async updateWallet(userId: string, amount: number, transactionType: string, date: string): Promise<null> {
        try {
            console.log(userId, amount, transactionType, date)
            return null
        } catch (error) {
            throw new Error('Error updating wallet: ' + error);
        }
    }
}