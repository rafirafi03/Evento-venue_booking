import { NextFunction, Request, Response } from "express";
import { SignupUseCase } from "../../useCases/index";


export class UserController {
    
    constructor(
        private signupUseCase: SignupUseCase
    ) {}

    async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {email} = req.body;

        try {
            const response = await this.signupUseCase.execute(email)

            res.status(200).json(response)
        } catch (error) {
            console.log(error);  
        }
    }
}