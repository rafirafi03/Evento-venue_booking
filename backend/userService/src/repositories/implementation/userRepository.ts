import { BadRequestError } from "tune-up-library";
import { IUser, userModel } from "../../infrastructure/db";
import { IUserRepository } from "../interfaces";

export class UserRepository implements IUserRepository {

    async findByEmail(email: string): Promise<IUser | null> {
        try {
            const user = await userModel.findOne({ email });
            if(!user) return null
            return user
        } catch (error) {
            throw new BadRequestError('error in DB'+ error)
        }
    }
}