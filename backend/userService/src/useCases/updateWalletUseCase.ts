import { IUserRepository } from "../repositories";

export class UpdateWalletUseCase {
    constructor(
        private _userRepository: IUserRepository
    ) {}

    async execute(userId: string, amount: number, transactionType: string, date: string) : Promise<{success: true}> {
        try {
            console.log(userId, amount, transactionType, date," datassss in updateWallet use case")

            const user = await this._userRepository.findById(userId)

            if(user) {
                const wallet = user?.wallet + amount;

            }

            await this._userRepository.updateWallet(userId, amount, transactionType, date);

            return {success: true}
        } catch (error) {
            throw new Error('failed to delete'+ error)
        }
    }
}