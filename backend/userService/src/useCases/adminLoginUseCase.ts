import { TokenService } from "evento-library";
// import User from "../infrastructure/db/models/userModel";
import { IUserRepository } from "../repositories";
import { hashPass } from "../utils";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { ILoginResponse } from "./interfaces";

dotenv.config()

export class AdminLoginUseCase {
    constructor(
        private _userRepository : IUserRepository
    ) {}

    async execute (email: string, password:string) : Promise<ILoginResponse | null> {

        try {
            const secretKey = process.env.JWTSECRETKEY as string

            const user = await this._userRepository.findByEmail(email);
            
            if(user?.isVerified) {
    
                console.log(user,"bcknduser")
    
                const hashedPass = await hashPass(password);
    
                const pass = bcrypt.compare(hashedPass, password)
    
                if(!pass) {
                    throw new Error('password doesnt match')
                } else {
                    const tokenservice = new TokenService(secretKey)
    
                    const token = tokenservice.generateToken({userId: user._id as string, email: user.email})
    
                    return {success: true, token}
                }
    
            } 

            return null
        } catch (error) {
            console.log(error)

            throw new Error('new Error'+error)
        }
        
        
    }
}