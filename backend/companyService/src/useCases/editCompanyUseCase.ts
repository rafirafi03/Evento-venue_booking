import { ICompanyRepository } from "../repositories";

interface data {
  companyId: string
  name: string;
  phone: number;
}

export class EditCompanyUseCase {
  constructor(private _companyRepository: ICompanyRepository) {}

  async execute({
    companyId,
    name,
    phone,
  }: data): Promise<{ success: boolean }> {
    try {

      const company = await this._companyRepository.findCompanyById(companyId);

        if(!company) {
            throw new Error('Company not found');
        }

        company.name = name;
        company.phone = phone

        await this._companyRepository.editCompanyProfile(companyId, company);
      
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }
}
