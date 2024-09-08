import { Request, Response } from "express";
import { RegisterUseCase } from "../../useCases/index";
import { VerifyOtpUsecase } from "../../useCases/verifyOtpUseCase";

export class CompanyController {
  constructor(
    private _registerUseCase : RegisterUseCase,
    private _verifyOtpUseCase : VerifyOtpUsecase

  ) {}

  async signup(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    console.log(req.body,"reqbdyyycntrlrr")

    try {
      const response = await this._registerUseCase.execute(email);

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async confirmOtp(req: Request, res: Response): Promise<void> {
    const {otp, name, email, phone, country, password} = req.body;

    try {
      const response = await this._verifyOtpUseCase.execute({
        otp,name,email,phone,country,password
      })

      res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  }

  
}
