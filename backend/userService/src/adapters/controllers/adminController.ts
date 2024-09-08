import { Request, Response } from "express";
import { AdminLoginUseCase, GetUsersUseCase } from "../../useCases";
import { HttpStatusCode } from "../../constants";

export class AdminController {
    constructor(
        private _adminLoginUseCase : AdminLoginUseCase,
        private _getUsersUseCase : GetUsersUseCase
    ) {}

    async adminLogin( req: Request, res: Response) : Promise<void> {
        const { email, password } = req.body;

        try {
            const response = await this._adminLoginUseCase.execute(email, password)

            res.status(HttpStatusCode.OK).json(response)
        } catch (error) {
            console.log(error)
        }
    }

    async getUsers(req: Request, res: Response) : Promise<any> {
        try {
            const users = await this._getUsersUseCase.execute()
            res.status(HttpStatusCode.OK).json({users})
        } catch (error) {
            console.log(error)
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({message: 'Internal error'})
        }
    }
}