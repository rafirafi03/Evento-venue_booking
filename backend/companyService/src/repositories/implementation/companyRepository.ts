import { ICompanyData, Company } from "../../entities"
import { companyModel, ICompany }from "../../infrastructure/db"
import { ICompanyRepository } from "../interfaces/companyInterface"


export class CompanyRepository implements ICompanyRepository {

    async save(company: Company) : Promise<ICompanyData> {
        try {
            const newCompany = new companyModel(company);
            await newCompany.save()
            return newCompany as ICompanyData
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

    async findById(id: string): Promise<ICompany | null> {
        try {
            console.log(id, "id in cmpny implementation")
            const company = await companyModel.findById({ _id:id });
            console.log(id,"idd123 at cmpnyrepo")
            console.log(company,"cmpny123 at cmpnyrepo")
            if(!company) return null
            return company
        } catch (error) {
            throw new Error('error in DB'+ error)
        }
    }

    async getRequests(): Promise<ICompany[]> {
        try {
            const requests = await companyModel.find({isVerified: false})

            console.log(requests,"reqssssssss")

            return requests as ICompany[]
        } catch (error) {
            console.error("Error fetching unverified company requests:", error);
            throw new Error("Failed to fetch unverified company requests");
        }
    }

    async getCompanies(): Promise<ICompany[]> {
        try {
            const requests = await companyModel.find({isVerified: true})

            console.log(requests,"reqssssssss")

            return requests as ICompany[]
        } catch (error) {
            console.error("Error fetching unverified company requests:", error);
            throw new Error("Failed to fetch unverified company requests");
        }
    }
}