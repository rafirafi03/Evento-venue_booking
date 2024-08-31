import { NextFunction, Request, Response } from "express";
import { 
    SignupUseCase,
    VerifyOtpUsecase
 } from "../../useCases/index";


export class UserController {
    
    constructor(
        private signupUseCase: SignupUseCase,
        private verifyOtpUsecase : VerifyOtpUsecase
    ) {}

    async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {email} = req.body;

        console.log(req.body,"reqbodyusercontrollersignup")

        try {
            const response = await this.signupUseCase.execute(email)

            res.status(200).json(response)
        } catch (error) {
            console.log(error);  
        }
    }

    async verifyOtp(req: Request, res: Response, next: NextFunction) : Promise<void> {
        const {otp,email,userName,phone, password} = req.body;

        console.log(req.body,"reqbodyyyusercontroller")

        try {
            const response = await this.verifyOtpUsecase.execute(otp,email,userName,phone,password)

            if(response.success) {
                console.log('successfully saved to db')
            }

            res.status(200).json(response)
        } catch (error) {
            console.log(error)
        }
    }
}