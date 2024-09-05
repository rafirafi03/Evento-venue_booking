import mongoose, { Document, Schema} from 'mongoose';

export interface ICompany extends Document {
    name: string;
    email: string;
    phone: number;
    country: string;
    password: string;
    isBlocked: boolean;
    isVerified: boolean;
}

const CompanySchema: Schema = new Schema<ICompany>({
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      country: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true,
      },
      isBlocked: {
        type: Boolean,
        default: false,
      },
      isVerified: {
        type: Boolean,
        default: false
      }
})

const Company = mongoose.model<ICompany>('Company', CompanySchema);

export default Company;