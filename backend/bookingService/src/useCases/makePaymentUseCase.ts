import Stripe from "stripe";
import { DateValue } from "@internationalized/date";
import { getUserDetails } from "../infrastructure/grpc/grpcServices/grpcUserClient";
import { getVenueDetails } from "../infrastructure/grpc/grpcServices/grpcVenueClient";

type RangeValue<T> = {
  start: T;
  end: T;
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export class MakePaymentUseCase {
  constructor() {}

  async execute(
    userId: string,
    venueId: string,
    event: string,
    guests: number,
    bookingDuration: RangeValue<DateValue>
  ): Promise<any> {
    try {

      const userDetails = await getUserDetails(userId);
      const venueDetails = await getVenueDetails(venueId);

      console.log(venueDetails," venue details sssssl sfksajflsakfja;skfjsadfksjf")


      const startDate = new Date(
        bookingDuration.start.year,
        bookingDuration.start.month - 1,
        bookingDuration.start.day
      );
      const endDate = new Date(
        bookingDuration.end.year,
        bookingDuration.end.month - 1,
        bookingDuration.end.day
      );

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      // Calculate the number of days including both start and end dates
      const timeDiff = endDate.getTime() - startDate.getTime();
      const days = timeDiff / (1000 * 3600 * 24) + 1; // Add 1 to include both days

      const totalAmount = venueDetails.venueAmount * days; // total amount (in dollars)

      // Calculate 10% of the total amount
      let finalAmount = totalAmount * 0.10;

      if (finalAmount > 25000) {
        finalAmount = 25000;
      }


      const lineItems = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Advance amount",
            },
            unit_amount : finalAmount, // Total amount based on the number of guests (in cents)
          },
          quantity: 1, 
        },
      ];

      // Create a session in Stripe
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `http://localhost:3000/venueDetails/${venueId}`,
        cancel_url: `http://localhost:3000/venueDetails/${venueId}`,
        metadata: {
          userDetails: JSON.stringify(userDetails),
          venueDetails: JSON.stringify(venueDetails),
          userId: userId,
          venueId: venueId,
          eventName:event,
          finalAmount: JSON.stringify(finalAmount),
          guests: JSON.stringify(guests), // Convert number to string
          bookingDateStart: startDate.toISOString(), // Store ISO string representation
          bookingDateEnd: endDate.toISOString(),
        }
      });

      return { id: session.id }; // Return the session ID to the frontend for redirection
    } catch (error) {
      throw new Error("Internal server error: ");
    }
  }
}
