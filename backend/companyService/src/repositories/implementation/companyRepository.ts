import { ICompanyData, Company, Venue, IVenueData, IOfferData, Offer } from "../../entities";
import {
  companyModel,
  ICompany,
  IVenue,
  venueModel,
  offerModel,
  IOffer
} from "../../infrastructure/db";
import { ICompanyRepository } from "../interfaces/companyInterface";

export class CompanyRepository implements ICompanyRepository {
  async save(company: Company): Promise<ICompanyData> {
    try {
      const newCompany = new companyModel(company);
      await newCompany.save();
      return newCompany as ICompanyData;
    } catch (error) {
      throw new Error("Error" + error);
    }
  }

  async findByEmail(email: string): Promise<ICompany | null> {
    try {
      const company = await companyModel.findOne({ email });
      if (!company) return null;
      return company;
    } catch (error) {
      throw new Error("error in DB" + error);
    }
  }

  async findById(id: string): Promise<ICompany | null> {
    try {
      console.log(id, "id in cmpny implementation");
      const company = await companyModel.findById({ _id: id });
      console.log(id, "idd123 at cmpnyrepo");
      console.log(company, "cmpny123 at cmpnyrepo");
      if (!company) return null;
      return company;
    } catch (error) {
      throw new Error("error in DB" + error);
    }
  }

  async findVenueByCompanyId(id: string): Promise<IVenue[] | null> {
    try {
      const venueByCompany = await venueModel.find({ companyId: id });
      if (!venueByCompany) return null;
      return venueByCompany;
    } catch (error) {
      throw new Error("error in DB" + error);
    }
  }

  async getRequests(): Promise<ICompany[]> {
    try {
      const requests = await companyModel.find({ isVerified: "pending" });

      return requests as ICompany[];
    } catch (error) {
      console.error("Error fetching unverified company requests:", error);
      throw new Error("Failed to fetch unverified company requests");
    }
  }

  async getCompanies(): Promise<ICompany[]> {
    try {
      const requests = await companyModel.find({ isVerified: "verified" });

      return requests as ICompany[];
    } catch (error) {
      console.error("Error fetching unverified company requests:", error);
      throw new Error("Failed to fetch unverified company requests");
    }
  }

  async addVenue(venue: Venue): Promise<IVenueData> {
    try {
      const newVenue = new venueModel(venue);
      await newVenue.save();
      return newVenue as IVenueData;
    } catch (error) {
      throw new Error("error" + error);
    }
  }

  async getVenues(companyId: string): Promise<IVenue[]> {
    try {
      const venues = await venueModel.find({companyId: companyId});

      return venues as IVenue[];
    } catch (error) {
      console.error("Error fetching venues:", error);
      throw new Error("Failed to fetch venues");
    }
  }

  async getListedVenues(): Promise<IVenue[]> {
    try {
      const venues = await venueModel.find({isListed: true, isCompanyBlocked: false});

      return venues as IVenue[];
    } catch (error) {
      console.error("Error fetching venues:", error);
      throw new Error("Failed to fetch venues");
    }
  }

  async findVenueById(id: string): Promise<IVenue | null> {
    try {
      const venue = await venueModel.findById({ _id: id });
      if (!venue) return null;
      return venue;
    } catch (error) {
      throw new Error("error in DB" + error);
    }
  }

  async updateVenue(venueId: string, venueData: IVenue): Promise<void> {
    try {
      await venueModel.findByIdAndUpdate(venueId, venueData, { new: true });
    } catch (error) {
      throw new Error('error in DB' + error)
    }
  }

  async deleteVenue(venueId: string): Promise<void> {
    try {
      await venueModel.findByIdAndDelete({_id: venueId})
    } catch (error) {
      throw new Error('error in DB' + error)
    }
  }

  async findCompanyById(id: string): Promise<ICompany | null> {
    try {
      const company = await companyModel.findById({ _id: id });
      if (!company) return null;
      return company;
    } catch (error) {
      throw new Error("error in DB" + error);
    }
  }

  async editCompanyProfile(companyId: string, company: ICompany | null): Promise<void> {
    try {
      if(company) {
        await companyModel.findByIdAndUpdate(companyId, company, { new: true })
      } else {
        throw new Error('company data is null')
      }
    } catch (error) {
      throw new Error("error in DB" + error);
    }
  }

  async addOffer(offer: Offer): Promise<IOfferData | null> {
    try {
      const newOffer = new offerModel(offer);
      await newOffer.save();
      return newOffer as IOfferData;
    } catch (error) {
      throw new Error("error in DB" + error);
    }
  }

  async getOffers(companyId: string): Promise<IOffer[] | null> {
    try {
      const offers = await offerModel.find({companyId: companyId})

      return offers as IOffer[]
    } catch (error) {
      throw new Error("error in DB" + error);
    }
  }

  async deleteOffer(offerId: string): Promise<void> {
    try {
      await offerModel.findByIdAndDelete({_id: offerId})
    } catch (error) {
      throw new Error("error in DB" + error);
    }
  }

  async removeOffer(venueId: string): Promise<void> {
    try {
      await venueModel.updateOne({ _id: venueId }, { $unset: { offerId: "" } })
    } catch (error) {
      throw new Error("error in DB" + error);
    }
  }

}
