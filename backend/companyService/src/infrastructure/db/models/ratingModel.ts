import mongoose, { Document, Schema} from 'mongoose';

export interface IRating extends Document {
    _id: mongoose.Types.ObjectId;
    userId: string;
    venueId: string;
    userName: string;
    userEmail: string;
    star: number;
    review: string;
}

const RatingSchema: Schema = new Schema<IRating>({
      venueId: {
        type: String,
        required: true
      },
      userId: {
        type: String,
        required: true
      },
      userName: {
        type: String,
        required: true,
      },
      userEmail: {
        type: String,
        required: true,
      },
      star: {
        type: Number,
        required: true
      },
      review: {
        type: String,
        required: true
      }
})

const Rating = mongoose.model<IRating>('Rating', RatingSchema);

export default Rating;