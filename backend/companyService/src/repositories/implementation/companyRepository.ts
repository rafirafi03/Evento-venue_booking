import { ICompanyData, Company } from "../../entities"
import { companyModel }from "../../infrastructure/db"
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
}