import { Request, Response } from "express";
import { RegisterUseCase } from "../../useCases/index";
import { VerifyOtpUsecase } from "../../useCases/verifyOtpUseCase";
import { ResendOtpUseCase } from "../../useCases/resendOtpUseCase";
import { LoginUseCase } from '../../useCases'


export class CompanyController {
  constructor(
    private _registerUseCase : RegisterUseCase,
    private _loginUseCase : LoginUseCase,
    private _verifyOtpUseCase : VerifyOtpUsecase,
    private _resendOtpUseCase : ResendOtpUseCase,
  ) {}

  async signup(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    console.log(req.body,"reqbdyyycntrlrr")

    try {
      const response = await this._registerUseCase.execute(email);

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      throw new Error('error' + error)
    }
  }

  async login(req: Request, res: Response) : Promise<void> {
    try {
      const {email, password} = req.body;

      console.log(email,"emailcontroller",password,"pass controller")
      const response = await this._loginUseCase.execute(email,password)
      res.status(200).json(response);
      console.log(response)
    } catch (error) {
      console.log(error);
      throw new Error('error' + error)
    }
  }

  async confirmOtp(req: Request, res: Response): Promise<void> {
    const {otp, name, email, phone, country, password} = req.body;
    const license = req.file?.path;

    console.log(req.body,"reqbdyyyyycntrlrcpmny")
    console.log(req.file,"reqfileeeecntrlrcpmny")
    // const {license} = req.file;

    try {
      const response = await this._verifyOtpUseCase.execute({
        otp,name,email,phone,country,password,license
      })

      console.log(response,"response companycontroller")

      res.status(200).json(response)
    } catch (error) {
      console.log(error)
    }
  }

  async resendOtp(
    req: Request,
    res: Response
  ) : Promise<void> {
    
    try {
      const { email } = req.body;
      
      const response = await this._resendOtpUseCase.execute(email)

      res.status(200).json(response)

    } catch (error) {
      console.log(error);
      throw new Error('error'+error)
    }
  }

}
