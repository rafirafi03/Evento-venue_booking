import { IUser } from "../../infrastructure/db";

export interface IAdminRepository {
    getUsers() : Promise<any>
}