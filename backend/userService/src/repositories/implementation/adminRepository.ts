import { IUser, userModel } from "../../infrastructure/db";
import { IAdminRepository } from "../interfaces/adminInterface";

export class AdminRepository implements IAdminRepository {
    async getUsers(): Promise<any> {
        try {
            const users = await userModel.find()

            return users as IUser[]
        } catch (error) {
            console.log(error)
        }
    }
}