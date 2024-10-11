import { ICompanyData, Company, Venue, IVenueData } from "../../entities";
import {
  companyModel,
  ICompany,
  IVenue,
  venueModel,
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

  async getRequests(): Promise<ICompany[]> {
    try {
      const requests = await companyModel.find({ isVerified: "pending" });

      console.log(requests, "reqssssssss");

      return requests as ICompany[];
    } catch (error) {
      console.error("Error fetching unverified company requests:", error);
      throw new Error("Failed to fetch unverified company requests");
    }
  }

  async getCompanies(): Promise<ICompany[]> {
    try {
      const requests = await companyModel.find({ isVerified: "verified" });

      console.log(requests, "reqssssssss");

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

  async getVenues(): Promise<IVenue[]> {
    try {
      const venues = await venueModel.find();

      console.log(venues, "vnssssss");

      return venues as IVenue[];
    } catch (error) {
      console.error("Error fetching venues:", error);
      throw new Error("Failed to fetch venues");
    }
  }

  async getListedVenues(): Promise<IVenue[]> {
    try {
      const venues = await venueModel.find({isListed: true});

      console.log(venues, "vnssssss");

      return venues as IVenue[];
    } catch (error) {
      console.error("Error fetching venues:", error);
      throw new Error("Failed to fetch venues");
    }
  }

  async findVenueById(id: string): Promise<IVenue | null> {
    try {
      const venue = await venueModel.findById({ _id: id });
      console.log(id, "idd123 at cmpnyrepo");
      console.log(venue, "cmpny123 at cmpnyrepo");
      if (!venue) return null;
      return venue;
    } catch (error) {
      throw new Error("error in DB" + error);
    }
  }

}
