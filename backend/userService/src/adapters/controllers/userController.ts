import { Request, Response } from "express";
import { SignupUseCase, VerifyOtpUsecase, UserLoginUseCase, ResendOtpUseCase, GetUserDetailsUseCase, ResetPasswordUseCase, EditUserProfileUseCase} from "../../useCases";
import { HttpStatusCode } from "../../constants";

export class UserController {
  constructor(
    private _signupUseCase: SignupUseCase,
    private _verifyOtpUsecase: VerifyOtpUsecase,
    private _userLoginUseCase : UserLoginUseCase,
    private _resendOtpUseCase : ResendOtpUseCase,
    private _getUserDetailsUseCase : GetUserDetailsUseCase,
    private _resetPassUseCase : ResetPasswordUseCase,
    private _editUserProfileUseCase: EditUserProfileUseCase,
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

  async getUserDetails( req: Request, res: Response) : Promise<void> {

    try {
      const { userId } = req.params;

      const response = await this._getUserDetailsUseCase.execute(userId)

      res.status(HttpStatusCode.OK).json(response)
      
    } catch (error) {
      console.log(error)
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: 'failed to get user details',
      });
    }
  }

  async resetPassword( req: Request, res: Response) : Promise<void> {
    try {
      console.log(req.body,"req body in controller of user which in resetpasss")
      const {userId, currPass, newPass} = req.body

      const response = await this._resetPassUseCase.execute({ id:userId, currPass, newPass});

      res.status(HttpStatusCode.OK).json(response)

      console.log(response,"response in resetpasss in controller")
    } catch (error) {
      console.log(error)
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: 'failed to reset password',
      });
    }
  }

  async editUserProfile( req: Request, res: Response) : Promise<void> {
    try {
      console.log(req.body,"req body in controller of user which in resetpasss")
      const {userId, userName} = req.body

      const response = await this._editUserProfileUseCase.execute({ id:userId, userName});

      res.status(HttpStatusCode.OK).json(response)

      console.log(response,"response in resetpasss in controller")
    } catch (error) {
      console.log(error)
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: 'failed to reset password',
      });
    }
  }


}
