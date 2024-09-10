import { Request, Response } from "express";
import { SignupUseCase, VerifyOtpUsecase, UserLoginUseCase } from "../../useCases/index";
import { HttpStatusCode } from "../../constants";
import { ResendOtpUseCase } from "../../useCases/resendOtpUseCase";

export class UserController {
  constructor(
    private _signupUseCase: SignupUseCase,
    private _verifyOtpUsecase: VerifyOtpUsecase,
    private _userLoginUseCase : UserLoginUseCase,
    private _resendOtpUseCase : ResendOtpUseCase
  ) {}

  async signup(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    try {
      const response = await this._signupUseCase.execute(email);

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async verifyOtp(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { otp, email, userName, phone, password } = req.body;

    try {
      const response = await this._verifyOtpUsecase.execute({
        otp,
        userName,
        email,
        phone,
        password,
      });

      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async resendOtp(
    req: Request,
    res: Response
  ) : Promise<void> {
    
    try {
      const { email } = req.body;
      
      const response = await this._resendOtpUseCase.execute(email)

      res.status(HttpStatusCode.OK).json(response)

    } catch (error) {
      console.log(error);
      throw new Error('error'+error)
    }


  }

  async login( req: Request, res: Response) : Promise<void> {
    const {email, password} = req.body;

    try {
      const response = await this._userLoginUseCase.execute(
        email, password
      )

      res.status(HttpStatusCode.OK).json(response)
    } catch (error) {
      console.log(error)
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: 'Login failed. Invalid email or password.',
      });
    }
  }
}
