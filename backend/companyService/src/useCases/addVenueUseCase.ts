import Venue from "../infrastructure/db/models/venueModel";
import { ICompanyRepository } from "../repositories";

interface data {
  companyId: string;
  name: string;
  type: string;
  amount: number;
  capacity: number;
  description: string;
  address: string;
  phone: number;
  city: string;
  state: string;
  images: string[];
}

export class AddVenueUseCase {
  constructor(private _companyRepository: ICompanyRepository) {}

  async execute({
    companyId,
    name,
    type,
    amount,
    capacity,
    description,
    address,
    phone,
    city,
    state,
    images,
  }: data): Promise<{ success: boolean }> {
    try {
      const venue = new Venue({
        companyId,
        name,
        type,
        amount,
        capacity,
        description,
        address,
        phone,
        city,
        state,
        images,
      });

      const savedVenue = await this._companyRepository.addVenue(venue);
      console.log(savedVenue);
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }
}
