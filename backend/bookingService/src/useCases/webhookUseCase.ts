import Stripe from "stripe";
import { IBookingRepository } from "../repositories/interfaces";
import { Booking, User, Venue } from "../entities";
import { Types } from "mongoose";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export class WebhookUseCase {
  constructor(private _bookingRepository: IBookingRepository) {}

  async execute(event: any): Promise<any> {
    try {
      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.metadata) {
          const {
            userId,
            venueId,
            eventName,
            finalAmount,
            guests,
            bookingDateStart,
            bookingDateEnd,
          } = session.metadata;
          const { name, email, phone } = JSON.parse(
            session.metadata.userDetails
          );
          const { venueName, venueAmount, venueCity, venueState, venueImage } =
            JSON.parse(session.metadata.venueDetails);

          const guestCount = Number(guests);
          const amount = Number(venueAmount);
          const userPhone = Number(phone);
          const advance = Number(finalAmount);
          const startDate = new Date(bookingDateStart);
          const endDate = new Date(bookingDateEnd);

          if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
            console.log("Start Date:", startDate);
            console.log("End Date:", endDate);
          } else {
            console.error("Invalid dates:", { startDate, endDate });
          }

          if (isNaN(guestCount)) {
            throw new Error("Invalid guests count");
          }

          if (isNaN(amount)) {
            throw new Error("Invalid amount");
          }

          const booking = new Booking({
            userId,
            venueId,
            amount: advance,
            event: eventName,
            guests: guestCount,
            bookingDateStart: startDate,
            bookingDateEnd: endDate,
          });

          const user = new User({
            _id: new Types.ObjectId(userId),
            name,
            email,
            phone: userPhone,
          });

          const venue = new Venue({
            _id: new Types.ObjectId(venueId),
            name: venueName,
            amount: amount,
            city: venueCity,
            state: venueState,
            image: venueImage,
          });

          await this._bookingRepository.save(booking);
          await this._bookingRepository.saveUser(user);
          await this._bookingRepository.saveVenue(venue);
        }
      }
    } catch (error) {
      console.error(error);
      throw new Error("Internal server error: " + error);
    }
  }
}
