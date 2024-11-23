import { ICompanyRepository } from "../repositories";
import { IVenue } from "../infrastructure/db";

interface SearchParams {
    search: string;
    types: string[];
    priceRange: [number, number]
  }

export class GetListedVenuesUseCase {
    constructor (
        private _companyRepository: ICompanyRepository
    ) {}

    async execute({ search, types, priceRange }: SearchParams): Promise<{ venues: IVenue[] } | null> {
        try {
          
          let venues = await this._companyRepository.getListedVenues();
      
          console.log(venues, "cmpniessss cmpnyusecase");
      
          
          if (search) {
            venues = venues.filter((venue) =>
              venue.name.toLowerCase().includes(search.toLowerCase())
            );
          }
      
          
          if (types && types.length > 0) {
            venues = venues.filter((venue) =>
              types.some((type) => venue.type.toLowerCase() === type.toLowerCase())
            );
          }

          if (priceRange && priceRange.length === 2) {
            const [minPrice, maxPrice] = priceRange;
            venues = venues.filter((venue) => 
              venue.amount >= minPrice && venue.amount <= maxPrice
            );
          }
      
          
          if (!venues || venues.length === 0) {
            return null;
          } else {
            return { venues };
          }
        } catch (error) {
          throw new Error("Error: " + error);
        }
      }
      
}