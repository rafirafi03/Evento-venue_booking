import Stripe from 'stripe';
import Booking from '../infrastructure/db/models/bookingModel';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export class WebhookUseCase {
  constructor() {}

  async execute(event: any): Promise<any> {
    try {
      if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        if(session.metadata) {
          const { userDetails, userId, venueId, eventName, guests, bookingDateStart, bookingDateEnd} = session.metadata;



        const booking = new Booking({
          userId,
          venueId,
          amount: 4000,
          event: eventName,
          guests,
          bookingDateStart,
          bookingDateEnd
        })

        await booking.save()
        }
      }
      

    } catch (error) {
      console.error(error);
      throw new Error('Internal server error: ' + error);
    }
  }
}