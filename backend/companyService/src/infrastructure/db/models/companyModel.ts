import mongoose, { Document, Schema} from 'mongoose';

export enum VerificationStatus {
    Pending = "pending",
    Verified = "verified",
    Rejected = "rejected"
}

export interface ICompany extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    phone: number;
    country: string;
    password: string;
    license: string;
    isBlocked: boolean;
    isVerified: VerificationStatus;
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
      license: {
        type: String,
        required: true
      },
      isBlocked: {
        type: Boolean,
        default: false,
      },
      isVerified: {
        type: String,
        enum: Object.values(VerificationStatus),
        default: VerificationStatus.Pending
      }
})

const Company = mongoose.model<ICompany>('Company', CompanySchema);

export default Company;