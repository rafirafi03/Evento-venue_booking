import { TokenService } from "evento-library"
import { hashPass } from "../utils"
import bcrypt from 'bcrypt'
import { IUserRepository } from "../repositories"

export class UserLoginUseCase {
    constructor(
        private userRepository : IUserRepository
    ) {}

    async execute( email: string, password: string) : Promise<any> {

        const secretKey = process.env.JWTSECRETKEY as string

        const user = await this.userRepository.findByEmail(email)

        if(user) {
            const hashedPass = await hashPass(password)

            const pass = bcrypt.compare(hashedPass, password)

            if(!pass) {
                throw new Error('password doesnt match')
            } else {
                const tokenservice = new TokenService(secretKey)

                const token = tokenservice.generateToken({ userId: user._id as string, email: user.email})

                return {success: true, token}
            }
        }
    }
}