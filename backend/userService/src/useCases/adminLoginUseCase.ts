import { TokenService } from "evento-library";
// import User from "../infrastructure/db/models/userModel";
import { IUserRepository } from "../repositories";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { ILoginResponse } from "./interfaces";

dotenv.config()

export class AdminLoginUseCase {
    constructor(
        private _userRepository : IUserRepository
    ) {}

    async execute(email: string, password: string): Promise<ILoginResponse | null> {
        try {
            const secretKey = process.env.JWTSECRETKEY as string;
    
            const user = await this._userRepository.findByEmail(email);
    
            if (!user) {
                return { success: false, error: 'Invalid email' };
            }
    
            if (!user.isVerified) {
                return { success: false, error: 'User is not verified' };
            }
    
            const pass = await bcrypt.compare(password, user.password);
    
            if (!pass) {
                return { success: false, error: 'Incorrect password' };
            }
    
            const tokenService = new TokenService(secretKey);
            const token = tokenService.generateToken({
                userId: user._id as string,
                role: 'admin'
            });
    
            return { success: true, token };
        } catch (error) {
            console.log(error);
            throw new Error('Error: ' + error);
        }
    }
    
}