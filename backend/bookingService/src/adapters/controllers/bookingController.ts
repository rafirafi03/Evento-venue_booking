import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants";
import { CancelBookingUseCase, GetUserBookingsUseCase, MakePaymentUseCase, WebhookUseCase, GetCompanyBookingsUseCase } from "../../useCases";

export class BookingController {
  constructor(
    private _makePaymentUseCase: MakePaymentUseCase,
    private _webhookUseCase: WebhookUseCase,
    private _getUserBookingsUseCase : GetUserBookingsUseCase,
    private _getCompanyBookingsUseCase : GetCompanyBookingsUseCase,
    private _cancelBookingUseCase : CancelBookingUseCase
  ) {}

  async makePaymentRequest(req: Request, res: Response): Promise<void> {
    try {
      const { userId, venueId, event, guests, bookingDuration, paymentMethod } = req.body;
      const response = await this._makePaymentUseCase.execute(
        userId,
        venueId,
        event,
        guests,
        bookingDuration,
        paymentMethod
      );

      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: "failed to send request",
      });
    }
  }

  async webhook( req: Request, res: Response) : Promise<void> {
    try {
      const event = req.body;

      const response = await this._webhookUseCase.execute(event)
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: "failed to send request",
      });
    }
  }

  async getUserBookings(req: Request, res: Response) : Promise<void> {
    try {
      const { userId } = req.params;

      console.log(userId,"userId in controller of getbookings")

      const response = await this._getUserBookingsUseCase.execute(userId);

      res.status(HttpStatusCode.OK).json(response)
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: "failed to send request",
      });
    }
  }

  async getCompanyBookings(req: Request, res: Response) : Promise<void> {
    try {
      const { companyId } = req.params;

      console.log(companyId,"companyId in controller of getbookings")

      const response = await this._getCompanyBookingsUseCase.execute(companyId);

      res.status(HttpStatusCode.OK).json(response)
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: "failed to send request",
      });
    }
  }

  async cancelBooking(req: Request, res: Response) : Promise<void> {
    try {
      const { bookingId } = req.body;

      console.log(bookingId,"bookingid in controller vcance;")
      const response = await this._cancelBookingUseCase.execute( bookingId )

      res.status(HttpStatusCode.OK).json(response)
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: "failed to send request",
      });
    }
  }

  
}
