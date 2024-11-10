import { Request, Response } from "express";
import { HttpStatusCode } from "../constants";
import { MakePaymentUseCase } from "../useCases";

export class BookingController {
    constructor (
        private _makePaymentUseCase : MakePaymentUseCase
    ) {}

    async makePaymentRequest(req: Request, res: Response) : Promise<void> {
        try {
          const { name, venueId, event, guests, bookingDuration } = req.body;
          const response = await this._makePaymentUseCase.execute(name, venueId, event, guests, bookingDuration)
    
          res.status(HttpStatusCode.OK).json(response)
        } catch (error) {
          console.log(error)
          res.status(HttpStatusCode.UNAUTHORIZED).json({
            message: 'failed to send request',
          });
        }
      }


}
