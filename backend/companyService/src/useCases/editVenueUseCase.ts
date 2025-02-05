import { ICompanyRepository } from '../repositories/interfaces';

interface data {
  id: string
  name: string;
  type: string;
  description: string;
  capacity: number;
  address: string;
  amount:number;
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
    amount,
    phone,
    city,
    state,
    imagePaths,
    existingImages
  }: data): Promise<{ success: boolean }> {
    try {

      console.log("existingImages:",existingImages)
    const images = [...existingImages, ...imagePaths]

      const venueData = {
        name,
        type,
        description,
        amount,
        capacity: Number(capacity),
        address,
        phone: Number(phone),
        city,
        state,
        images,

      }

      console.log("venueData123:", venueData)

      await this._companyRepository.updateVenue(id, venueData);
      
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }
}
