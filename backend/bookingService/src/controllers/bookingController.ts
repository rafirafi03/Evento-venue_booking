import { Request, Response } from "express";
import { HttpStatusCode } from "../constants";
import { MakePaymentUseCase } from "../useCases";

export class BookingController {
  constructor(private _makePaymentUseCase: MakePaymentUseCase) {}

  async makePaymentRequest(req: Request, res: Response): Promise<void> {
    try {
      const { name, venueId, event, guests, bookingDuration } = req.body;
      const response = await this._makePaymentUseCase.execute(
        name,
        venueId,
        event,
        guests,
        bookingDuration
      );

      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      console.log(error);
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: "failed to send request",
      });
    }
  }

  // async handleWebHook(req: Request, res: Response): Promise<void> {
  //   const sig = req.headers['stripe-signature'] as string;
  //   try {
  //     const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET as string);

  //     if (event.type === 'checkout.session.completed') {
  //       const session = event.data.object as Stripe.Checkout.Session;

  //       // Map session data to Payment entity
  //       const payment: Payment = {
  //         customerId: session.customer as string,
  //         paymentStatus: session.payment_status!,
  //         amountTotal: session.amount_total!,
  //         currency: session.currency!,
  //         createdAt: new Date(),
  //       };

  //       // Save payment data
  //       await this.savePaymentDataUseCase.execute(payment);
  //     }

  //     res.status(200).json({ received: true });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(HttpStatusCode.UNAUTHORIZED).json({
  //       message: "failed to send request",
  //     });
  //   }
  // }
}
