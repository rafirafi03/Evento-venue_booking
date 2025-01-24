import { IUserRepository } from "../repositories";

export class UpdateWalletUseCase {
    constructor(
        private _userRepository: IUserRepository
    ) {}

    async execute(userId: string, amount: number, transactionType: 'credit' | 'debit', date: string) : Promise<{success: true}> {
        try {
            console.log(userId, amount, transactionType, date," datassss in updateWallet use case")

            const user = await this._userRepository.findById(userId)

            if (!user) {
                throw new Error("User not found");
            }

            if (!transactionType) {
                throw new Error("`transactionType` is required");
              }

            // Adjust the wallet balance
            if (transactionType === 'credit') {
                user.wallet += amount;
            } else if (transactionType === 'debit') {
                if (user.wallet < amount) {
                    throw new Error("Insufficient wallet balance");
                }
                console.log('debitedddddddddddddddddddddddddddddddd')
                user.wallet -= amount;
            }

            const newWalletHistory = {
                transactionType,
                amount,
                date: new Date(date)
            }

            // Add a new transaction to wallet history
            user.walletHistory.push(newWalletHistory);


            await this._userRepository.save(user);
            
            return {success: true}
        } catch (error) {
            throw new Error('failed to delete'+ error)
        }
    }
}