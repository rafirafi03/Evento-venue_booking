import mongoose, { Document, Schema } from 'mongoose';


export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  phone: number;
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
  }
});


const User = mongoose.model<IUser>('User', UserSchema);

export default User;
