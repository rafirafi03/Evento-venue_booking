import { NextFunction, Request, Response } from "express";
import { RegisterUseCase } from "../../useCases/index";

export class CompanyController {
  constructor(
    private registerUseCase : RegisterUseCase,

  ) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, email, phone, country, password } = req.body;

    console.log(req.body,"reqbdyyycntrlrr")

    try {
      const response = await this.registerUseCase.execute({name,email,phone,country,password});

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  
}
