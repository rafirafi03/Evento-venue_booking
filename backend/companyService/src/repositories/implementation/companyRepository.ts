import { ICompanyData, Company } from "../../entities"
import { companyModel, ICompany }from "../../infrastructure/db"
import { ICompanyRepository } from "../interfaces/companyInterface"


export class CompanyRepository implements ICompanyRepository {

    async save(company: Company) : Promise<ICompanyData> {
        try {
            const newCompany = new companyModel(company);
            await newCompany.save()
            return newCompany
        } catch (error) {
            throw new Error("Error" + error)
        }
    }

    async findByEmail(email: string): Promise<ICompany | null> {
        try {
            const company = await companyModel.findOne({ email });
            if(!company) return null
            return company
        } catch (error) {
            throw new Error('error in DB'+ error)
        }
    }
}