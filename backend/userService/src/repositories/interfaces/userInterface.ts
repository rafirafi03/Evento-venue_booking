import { IUser } from "../../infrastructure/db";
import { IUserData, User } from '../../entities'

export interface IUserRepository {
    findByEmail(email: string): Promise<IUser | null>
    save(user:User) : Promise<IUserData | null>
}