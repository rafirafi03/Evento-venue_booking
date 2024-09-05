import Company from "../infrastructure/db/models/companyModel";
import { ICompanyRepository } from "../repositories/interfaces/companyInterface";
import { hashPass } from "../utils";

interface data {
    name: string;
    email: string;
    phone: number;
    country: string;
    password: string
}

export class RegisterUseCase {
    constructor(
        private companyRepository : ICompanyRepository
    ) {}

    async execute({name,email,phone,country,password} : data) : Promise<any> {
        
        const hashedPass = await hashPass(password);

        const company = new Company({
            name,
            email,
            phone,
            country: country,
            password : hashedPass
        })

        await this.companyRepository.save(company)

        return { success: true}
    }
}