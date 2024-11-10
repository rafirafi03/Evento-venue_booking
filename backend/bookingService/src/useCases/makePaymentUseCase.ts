import Stripe from 'stripe';
import { DateValue } from "@internationalized/date";

type RangeValue<T> = {
  start: T;
  end: T;
};


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export class MakePaymentUseCase {
  constructor() {}

  async execute(name: string, venueId: string, event: string, guests: number, bookingDuration: RangeValue<DateValue>): Promise<any> {
    try {

        console.log(venueId);
        console.log(bookingDuration," booking duration");
        
      const lineItems = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: name,
              description: `Event: ${event} \n Guests: ${guests} \nDuration: ${bookingDuration.start} to ${bookingDuration.end}`,
            },
            unit_amount: Math.round(1200) // Assuming this is in cents (1200.00 USD)
          },
          quantity: 1
        }
      ];

      const session = await stripe.checkout.sessions.create({
        payment_method_types: [
          'card',
        ],
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:3000",
        cancel_url: "https://localhost:3000",
      });

      return { id: session.id };
    } catch (error) {
      console.error(error);
      throw new Error('Internal server error: ' + error);
    }
  }
}