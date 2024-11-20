import Stripe from 'stripe';
import { IBookingRepository } from '../repositories/interfaces';
import { Booking, User } from '../entities';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export class WebhookUseCase {
  constructor(
    private _bookingRepository: IBookingRepository
  ) {}

  async execute(event: any): Promise<any> {
    try {
      if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        if(session.metadata) {
          const { userId, venueId, eventName, guests, bookingDateStart, bookingDateEnd } = session.metadata;
          const {userId: id, name, email, phone} = JSON.parse(session.metadata.userDetails)

          console.log(session.metadata," session metadataaaaaaaaaaaaaaaaaa");

          const guestCount = Number(guests)
          const startDate = new Date(bookingDateStart);
          const endDate = new Date(bookingDateEnd);

          if (isNaN(guestCount)) {
            throw new Error("Invalid guests count");
          }




        const booking = new Booking({
          userId,
          venueId,
          amount: 4000,
          event: eventName,
          guests: guestCount,
          bookingDateStart: startDate,
          bookingDateEnd: endDate
        })

        const user = new User({
          _id: userId,
          name,
          email,
          phone
        })



        await this._bookingRepository.save(booking)
        await this._bookingRepository.saveUser(user)
        }
      }
      

    } catch (error) {
      console.error(error);
      throw new Error('Internal server error: ' + error);
    }
  }
}