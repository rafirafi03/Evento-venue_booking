import { TokenService } from "evento-library";
import { ICompanyRepository } from "../repositories";
import { ILoginResponse } from "./interfaces";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config()

export class LoginUseCase {
    constructor(
        private _companyRepository : ICompanyRepository
    ) {}

async execute(email: string, password: string) : Promise<ILoginResponse | null> {
    try {
        const secretKey = process.env.JWTSECRETKEY as string;

        const company = await this._companyRepository.findByEmail(email)

        if (!company) {
            console.log("no company")
            return { success: false, error: 'Invalid email' };
        }

        if (company.isVerified == 'pending') {
            console.log('not verified')
            return { success: false, error: 'Request is still pending, wait for admin to approve.' };
        } else if( company.isVerified == 'rejected') {
            return { success: false, error: 'Your request has been rejected' };
        }

        const pass = await bcrypt.compare(password, company.password);

        if (!pass) {
            return { success: false, error: 'Incorrect password' };
        }

        const tokenService = new TokenService(secretKey);
        const token = tokenService.generateToken({
            userId: company.id as string,
            role: "company"
        });

        return { success: true, token }; 
    } catch (error) {
        console.log(error);
        throw new Error('Error: ' + error);
    }
}

}