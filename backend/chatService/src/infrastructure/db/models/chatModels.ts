import mongoose, { Document, Schema} from 'mongoose';

export interface IChat extends Document {
    _id: mongoose.Types.ObjectId;
    senderId: string;
    receiverId: string;
    text: string;
    sender: string;
    timestamp: string;
}

const ChatSchema: Schema = new Schema<IChat>({
      senderId: {
        type: String,
        required: true,
      },
      receiverId: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      sender: {
        type: String,
        required: true
      },
      timestamp: {
        type: String,
        required: true,
      }
})

const Chat = mongoose.model<IChat>('Chat', ChatSchema);

export default Chat;