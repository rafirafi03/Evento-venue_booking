import { IUser } from "../../infrastructure/db";
import { User } from '../../entities'

export interface IUserRepository {
    findByEmail(email: string): Promise<IUser | null>
}