import { IChatRepository } from "../repository";
import { Chat } from "../entity/chatEntity";

export class SaveMessagesUseCase {
  constructor(
    private _chatRepository : IChatRepository
  ) {}

  async execute(message: Chat): Promise<{ success: boolean }> {
    try {

      console.log(message,"messageeee")

        this._chatRepository.saveMessage(message)
      
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }
}