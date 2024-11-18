import Stripe from "stripe";
import { DateValue } from "@internationalized/date";
import Booking from "../infrastructure/db/models/bookingModel";

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
      console.log(venueId);
      console.log(bookingDuration, " booking duration");

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

      // Creating the booking object
      const newBooking = {
        userId,
        venueId,
        paymentMethod: "online",
        bookingDateStart: startDate,
        bookingDateEnd: endDate,
        event,
        guests,
        cancelReason: "", // Initially no cancel reason
      };

      // Save the booking to the database (This should be done with your ORM, e.g., mongoose)
      // await Booking.create(newBooking); // Assuming you have a Booking model to save data

      const lineItems = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: event, // Set the event name dynamically
            },
            unit_amount: 120000, // Price in cents, assuming it's 1200.00 USD
          },
          quantity: guests, // Adjust based on the number of guests
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
          userId,
          venueId,
          event,
          guests: guests.toString(), // Convert number to string
          bookingDateStart: startDate.toISOString(), // Store ISO string representation
          bookingDateEnd: endDate.toISOString(),
        }
      });

      return { id: session.id }; // Return the session ID to the frontend for redirection
    } catch (error) {
      console.error(error);
      throw new Error("Internal server error: "); // Improved error handling
    }
  }
}
