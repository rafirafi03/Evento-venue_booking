import mongoose, { Document, Schema } from 'mongoose';


export interface IFavourites extends Document {
  _id: string;
  userId: string;
  venueId: string;
  venueName: string;
  venueAddress: string
  venueImage: string;
}


const FavouritesSchema: Schema = new Schema<IFavourites>({
  userId: {
    type: String,
    required: true,
  },
  venueId: {
    type: String,
    required: true,
  },
  venueName: {
    type: String,
    required: true,
  },
  venueAddress: {
    type: String,
    required: true
  },
  venueImage: {
    type: String,
    required: true,
  }
});


const Favourites = mongoose.model<IFavourites>('Favourites', FavouritesSchema);

export default Favourites;
