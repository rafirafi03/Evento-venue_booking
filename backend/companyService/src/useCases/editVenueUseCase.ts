import { ICompanyRepository } from '../repositories/interfaces';

interface data {
  id: string
  name: string;
  type: string;
  description: string;
  capacity: number;
  address: string;
  phone: number;
  city: string;
  state: string;
  imagePaths: string[];
  existingImages: string[]
}

export class EditVenueUseCase {
  constructor(private _companyRepository: ICompanyRepository) {}

  async execute({
    id,
    name,
    type,
    description,
    capacity,
    address,
    phone,
    city,
    state,
    imagePaths,
    existingImages
  }: data): Promise<{ success: boolean }> {
    try {

    const images = [...existingImages, ...imagePaths]

      const venueData = {
        name,
        type,
        description,
        capacity,
        address,
        phone,
        city,
        state,
        images,

      }

      await this._companyRepository.updateVenue(id, venueData);
      
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }
}
