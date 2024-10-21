import mongoose, { Document, Schema} from 'mongoose';

export interface IVenue extends Document {
    _id: mongoose.Types.ObjectId;
    companyId: string;
    name: string;
    type: string;
    description: string;
    capacity: number;
    address: string;
    phone: number;
    city: string;
    state: string;
    images: string[]
    isListed: boolean;
    isCompanyBlocked: boolean;
}

const VenueSchema: Schema = new Schema<IVenue>({
      companyId: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      capacity: {
        type: Number,
        required: true
      },
      address: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      images: {
        type: [String],
        required: true
      },
      isListed: {
        type: Boolean,
        default: true
      },
      isCompanyBlocked: {
        type: Boolean,
        default: false
      }
})

const Venue = mongoose.model<IVenue>('Venue', VenueSchema);

export default Venue;