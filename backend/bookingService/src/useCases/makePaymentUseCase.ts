import Stripe from 'stripe';
import { DateValue } from "@internationalized/date";
import Booking from '../infrastructure/db/models/bookingModel';

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

        const startDate = new Date(bookingDuration.start.year, bookingDuration.start.month - 1, bookingDuration.start.day);
      const endDate = new Date(bookingDuration.end.year, bookingDuration.end.month - 1, bookingDuration.end.day);

        const newBooking = new Booking({
          venueId,
          userId: '3456',
          paymentMethod: 'online',
          paymentStatus: 'pending',  // Payment status is 'pending' before creating Stripe session
          amount: 6000,
          bookingDateStart: startDate,
          bookingDateEnd: endDate ,
          event,
          guests,
          cancelReason: '',  // Initially no cancel reason
        });
  
        // Save the booking to the database
        const savedBooking = await newBooking.save();


        
      const lineItems = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: name,
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