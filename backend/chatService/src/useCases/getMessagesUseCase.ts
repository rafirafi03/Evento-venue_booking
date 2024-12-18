import { IChatRepository } from "../repository";
import { Chat } from "../entity/chatEntity";

export class GetMessagesUseCase {
  constructor(
    private _chatRepository : IChatRepository
  ) {}

  async execute(senderId: string, receiverId: string): Promise<Chat[]> {
    try {

      console.log(senderId,"senderIdddddd")
       const response = this._chatRepository.getMessages(senderId, receiverId)

       console.log(response,"responseeeee");
      
      return response
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}