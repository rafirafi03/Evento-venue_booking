import Stripe from 'stripe';
import Booking from '../infrastructure/db/models/bookingModel';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export class WebhookUseCase {
  constructor() {}

  async execute(event: any): Promise<any> {
    try {

        console.log(event,"event in usecase webhokkkkkkkkkkkk")
    } catch (error) {
      console.error(error);
      throw new Error('Internal server error: ' + error);
    }
  }
}