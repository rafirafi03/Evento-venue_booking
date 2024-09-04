import { NextFunction, Request, response, Response } from "express";
import { AdminLoginUseCase, GetUsersUseCase } from "../../useCases";

export class AdminController {
    constructor(
        private adminLoginUseCase : AdminLoginUseCase,
        private getUsersUseCase : GetUsersUseCase
    ) {}

    async adminLogin( req: Request, res: Response, next: NextFunction) : Promise<void> {
        const { email, password } = req.body;

        try {
            const response = await this.adminLoginUseCase.execute(email, password)

            res.status(200).json(response)
        } catch (error) {
            console.log(error)
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) : Promise<any> {
        try {
            const users = await this.getUsersUseCase.execute()
            res.status(200).json(users)
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Internal error'})
        }
    }
}