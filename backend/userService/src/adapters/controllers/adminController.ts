import { NextFunction, Request, Response } from "express";
import { AdminLoginUseCase, GetUsersUseCase } from "../../useCases";
import { HttpStatusCode } from "../../constants";

export class AdminController {
    constructor(
        private _adminLoginUseCase : AdminLoginUseCase,
        private _getUsersUseCase : GetUsersUseCase
    ) {}

    async adminLogin( req: Request, res: Response, next: NextFunction) : Promise<void> {
        const { email, password } = req.body;

        try {
            const response = await this._adminLoginUseCase.execute(email, password)

            res.status(HttpStatusCode.OK).json(response)
        } catch (error) {
            console.log(error)
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) : Promise<any> {
        try {
            const users = await this._getUsersUseCase.execute()
            res.status(200).json(users)
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Internal error'})
        }
    }
}