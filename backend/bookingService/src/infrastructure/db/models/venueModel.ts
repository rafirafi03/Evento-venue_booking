import mongoose, { Document, Schema} from 'mongoose';

export interface IVenue extends Document {
    _id: string;
    name: string;
    amount: number;
    city: string;
    state: string;
    image: string;
}

const VenueSchema: Schema = new Schema<IVenue>({
    name: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      }
})

export const VenueModel = mongoose.model<IVenue>('Venue', VenueSchema);

