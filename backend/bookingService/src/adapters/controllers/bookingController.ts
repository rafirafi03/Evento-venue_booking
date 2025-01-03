import { Request, Response } from "express";
import { HttpStatusCode } from "../../constants";
import {
  CancelBookingUseCase,
  GetUserBookingsUseCase,
  MakePaymentUseCase,
  WebhookUseCase,
  GetCompanyBookingsUseCase,
  GetBookingDetailsUseCase,
  CompanyDashboardDetailsUseCase,
  AdminDashboardUseCase,
  GetBookedDatesUseCase
} from "../../useCases";

export class BookingController {
  constructor(
    private _makePaymentUseCase: MakePaymentUseCase,
    private _webhookUseCase: WebhookUseCase,
    private _getUserBookingsUseCase: GetUserBookingsUseCase,
    private _getCompanyBookingsUseCase: GetCompanyBookingsUseCase,
    private _cancelBookingUseCase: CancelBookingUseCase,
    private _getBookingDetailsUseCase: GetBookingDetailsUseCase,
    private _companyDashboardDetailsUseCase: CompanyDashboardDetailsUseCase,
    private _adminDashboardUseCase : AdminDashboardUseCase,
    private _getBookedDates : GetBookedDatesUseCase
  ) {}

  async makePaymentRequest(req: Request, res: Response): Promise<void> {
    try {
      const { userId, venueId, event, guests, bookingDuration, paymentMethod } =
        req.body;

        console.log(req.body,"reqbdyyyyyyy 4545454545")
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
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: "failed to send request",
      });
    }
  }

  async webhook(req: Request, res: Response): Promise<void> {
    try {
      const event = req.body;

      const response = await this._webhookUseCase.execute(event);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: "failed to send request",
      });
    }
  }

  async getUserBookings(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;

      console.log(userId, "userId in controller of getbookings");

      const response = await this._getUserBookingsUseCase.execute(userId);

      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: "failed to send request",
      });
    }
  }

  async getBookingDetails(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      console.log(id, "id in controller of getbookingdetailsss");

      const response = await this._getBookingDetailsUseCase.execute(id);

      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: "failed to send request",
      });
    }
  }

  async getCompanyBookings(req: Request, res: Response): Promise<void> {
    try {
      const { companyId } = req.params;

      console.log(companyId, "companyId in controller of getbookings");

      const response = await this._getCompanyBookingsUseCase.execute(companyId);

      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      console.log(error," ERROR IN CATCH");
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: "failed to send request",
      });
    }
  }

  async cancelBooking(req: Request, res: Response): Promise<void> {
    try {
      const { bookingId } = req.body;

      console.log(bookingId, "bookingid in controller vcance;");
      const response = await this._cancelBookingUseCase.execute(bookingId);

      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: "failed to send request",
      });
    }
  }

  async companyDashboardDetails(req: Request, res: Response): Promise<void> {
    try {
      const { companyId } = req.params;

      console.log(companyId,"companyIddddddd")

      const response = await this._companyDashboardDetailsUseCase.execute(companyId);

      res.status(HttpStatusCode.OK).json(response)
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: "failed to send request",
      });
    }
  }

  async adminDashboardDetails(req: Request, res: Response): Promise<void> {
    try {

      const response = await this._adminDashboardUseCase.execute();

      res.status(HttpStatusCode.OK).json(response)
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: "failed to send request",
      });
    }
  }

  async getBookedDates(req: Request, res: Response) : Promise<void> {
    try {
      const response = await this._getBookedDates.execute()
      res.status(HttpStatusCode.OK).json(response)
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: "failed to fetch",
      });
    }
  }
}
