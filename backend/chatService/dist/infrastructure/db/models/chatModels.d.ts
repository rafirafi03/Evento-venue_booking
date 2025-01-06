import mongoose, { Document } from 'mongoose';
export interface IChat extends Document {
    _id: mongoose.Types.ObjectId;
    senderId: string;
    receiverId: string;
    text: string;
    sender: string;
    timestamp: Date;
}
declare const Chat: mongoose.Model<IChat, {}, {}, {}, mongoose.Document<unknown, {}, IChat> & IChat & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default Chat;
