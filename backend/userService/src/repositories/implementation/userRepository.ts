import { IUserData, User } from "../../entities";
import { IUser, userModel } from "../../infrastructure/db";
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

    async save(user:User): Promise<IUserData> {
        try {
            const newUser = new userModel(user);
            await newUser.save();
            return newUser;
        } catch (error) {
            throw new Error('Error' + error)
        }
    }
}