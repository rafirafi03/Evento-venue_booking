import { NextFunction, Request, Response } from "express";
import { AdminLoginUseCase } from "../../useCases";

export class AdminController {
    constructor(
        private adminLoginUseCase : AdminLoginUseCase
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
}