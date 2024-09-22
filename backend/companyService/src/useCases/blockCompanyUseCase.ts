import mongoose from "mongoose";
import { ICompanyRepository } from "../repositories";

export class BlockCompanyUseCase {
    constructor(
        private _companyRepository : ICompanyRepository
    ) {}

    async execute(id: string) : Promise<{success: boolean}> {
        try {
            console.log(id,"id in cpmyusecase")
            const company = await this._companyRepository.findById(id)

            console.log(company, "companyusecase")
            if(!company) {
                return { success: false } 
            }
            if(company.isBlocked) {
                company.isBlocked = false
            } else {
                company.isBlocked = true
            }

            await company.save()

            return { success: true} 
        } catch (error) {
            console.log(error)
            throw new Error('Internal server error'+ error)
        }
    }
}