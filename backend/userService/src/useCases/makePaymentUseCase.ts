import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export class MakePaymentUseCase {
  constructor() {}

  async execute(name: string, venueId: string): Promise<any> {
    try {

        console.log(venueId);
        
      const lineItems = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: name
            },
            unit_amount: Math.round(120000) // Assuming this is in cents (1200.00 USD)
          },
          quantity: 4
        }
      ];

      const session = await stripe.checkout.sessions.create({
        payment_method_types: [
          'card',  // Credit and debit cards
        ],
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:3000",
        cancel_url: "https://localhost:3000"
      });

      return { id: session.id };
    } catch (error) {
      console.error(error);
      throw new Error('Internal server error: ' + error);
    }
  }
}