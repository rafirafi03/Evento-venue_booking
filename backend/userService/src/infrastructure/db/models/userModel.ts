import mongoose, { Document, Schema } from 'mongoose';


export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  isBlocked: boolean;
}


const UserSchema: Schema = new Schema<IUser>({
  name: {
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
    type: String,
    required: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  }
});


const User = mongoose.model<IUser>('User', UserSchema);

export default User;
