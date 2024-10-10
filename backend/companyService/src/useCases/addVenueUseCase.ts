import Venue from "../infrastructure/db/models/venueModel";
import { ICompanyRepository } from "../repositories";

interface data {
  name: string;
  type: string;
  description: string;
  capacity: number;
  address: string;
  phone: number;
  city: string;
  state: string;
  images: string[];
}

export class AddVenueUseCase {
  constructor(private _companyRepository: ICompanyRepository) {}

  async execute({
    name,
    type,
    description,
    capacity,
    address,
    phone,
    city,
    state,
    images,
  }: data): Promise<{ success: boolean }> {
    try {
      const venue = new Venue({
        name,
        type,
        description,
        capacity,
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
