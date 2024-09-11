// import { IAdminRepository } from "../repositories/interfaces/adminInterface";

// interface ICompany {
//     _id: string;
//     name: string;
//     email: string;
//     phone: number;
//     country: string;
//     password: string;
//     isBlocked: boolean;
//     isVerified: boolean;
// }

// export class GetCompaniesUseCase {
//     constructor (
//         private _adminRepository: IAdminRepository
//     ) {}

//     async execute() : Promise<{companies: ICompany[]} | null> {

//         try {
//             const companies = await this._adminRepository.getCompanies()

//             if(!companies || companies.length === 0) {
//                 return null
//             } else {
//                 return { companies }
//             } 
//         } catch (error) {
//             throw new Error("Error" + error)
//         }
        
//     }
// }