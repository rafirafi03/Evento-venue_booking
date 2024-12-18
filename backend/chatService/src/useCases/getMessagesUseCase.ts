import { IChatRepository } from "../repository";
import { Chat } from "../entity/chatEntity";

export class GetMessagesUseCase {
  constructor(
    private _chatRepository : IChatRepository
  ) {}

  async execute(senderId: string, receiverId: string): Promise<{ success: boolean }> {
    try {

       const response = this._chatRepository.getMessages(senderId, receiverId)

       console.log(response,"responseeeee");
      
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }
}