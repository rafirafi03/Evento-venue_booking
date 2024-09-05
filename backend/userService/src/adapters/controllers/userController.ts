import { NextFunction, Request, Response } from "express";
import { SignupUseCase, VerifyOtpUsecase, UserLoginUseCase } from "../../useCases/index";

export class UserController {
  constructor(
    private signupUseCase: SignupUseCase,
    private verifyOtpUsecase: VerifyOtpUsecase,
    private userLoginUseCase : UserLoginUseCase
  ) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email } = req.body;

    try {
      const response = await this.signupUseCase.execute(email);

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async verifyOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { otp, email, userName, phone, password } = req.body;

    try {
      const response = await this.verifyOtpUsecase.execute({
        otp,
        userName,
        email,
        phone,
        password,
      });

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async login( req: Request, res: Response, next: NextFunction) : Promise<void> {
    const {email, password} = req.body;

    try {
      const response = await this.userLoginUseCase.execute(
        email, password
      )

      res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  }
}
