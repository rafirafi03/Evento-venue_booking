import mongoose, { Document, Schema} from 'mongoose';

export interface IOffer extends Document {
    _id: mongoose.Types.ObjectId;
    companyId: string;
    name: string;
    percentage: number;
    validity: number;
}

const OfferSchema: Schema = new Schema<IOffer>({
      companyId: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true,
      },
      percentage: {
        type: Number,
        required: true,
      },
      validity: {
        type: Number,
        required: true
      }
})

const Offer = mongoose.model<IOffer>('Offer', OfferSchema);

export default Offer;