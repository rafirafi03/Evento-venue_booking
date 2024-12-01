import mongoose, { Document, Schema } from 'mongoose';


export interface IWalletHistory {
  amount: number;
  transactionType: 'credit' | 'debit'; // Define transaction type
  date: Date;
}

export interface IUser extends Document {
  _id: string;
  userName: string;
  email: string;
  password: string;
  phone: number;
  wallet : number;
  walletHistory: IWalletHistory[];
  isBlocked: boolean;
  isVerified: boolean;
}


const UserSchema: Schema = new Schema<IUser>({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  wallet : {
    type: Number,
    default: 0
  },
  walletHistory: [
    {
      transactionType: {
        type: String,
        enum: ['credit','debit'],
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      date: {
        type: Date,
        required: true
      }
    }
  ]

});


const User = mongoose.model<IUser>('User', UserSchema);

export default User;
