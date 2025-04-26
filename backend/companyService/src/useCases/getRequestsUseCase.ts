import { ICompanyRepository } from "../repositories";
import { ICompany } from "../infrastructure/db";

export class GetRequestsUseCase {
  constructor(private _companyRepository: ICompanyRepository) {}

  async execute(): Promise<{ requests: ICompany[] } | null> {
    try {
      const requests = await this._companyRepository.getRequests();

      console.log("requests 12345 : ", requests)

      if (!requests || requests.length === 0) {
        return null;
      }

      return { requests };
    } catch (error) {
      throw new Error("Error" + error);
    }
  }
}
