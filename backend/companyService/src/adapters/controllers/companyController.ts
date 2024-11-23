import { Request, Response } from "express";
import {
  RegisterUseCase,
  VerifyOtpUsecase,
  ResendOtpUseCase,
  LoginUseCase,
  AddVenueUseCase,
  GetVenuesUseCase,
  VenueStatusUseCase,
  GetListedVenuesUseCase,
  EditVenueUseCase,
  GetVenueDetailsUseCase,
  DeleteVenueUseCase,
  EditCompanyUseCase,
  AddOfferUseCase,
  GetOffersUseCase,
  DeleteOfferUseCase,
  ApplyOfferUseCase,
  RemoveOfferUseCase
} from "../../useCases";
import { HttpStatusCode } from "../../constants";
import { GetCompanyDetailsUseCase } from "../../useCases/getCompanyDetailsUseCase";
import dotenv from 'dotenv'

dotenv.config()

export class CompanyController {
  constructor(
    private _registerUseCase: RegisterUseCase,
    private _loginUseCase: LoginUseCase,
    private _verifyOtpUseCase: VerifyOtpUsecase,
    private _resendOtpUseCase: ResendOtpUseCase,
    private _addVenueUseCase: AddVenueUseCase,
    private _getVenues: GetVenuesUseCase,
    private _getListedVenues: GetListedVenuesUseCase,
    private _updateVenueStatus: VenueStatusUseCase,
    private _getVenueDetailsUseCase: GetVenueDetailsUseCase,
    private _editVenueUseCase: EditVenueUseCase,
    private _deleteVenueUseCase : DeleteVenueUseCase,
    private _getCompanyDetailsUseCase : GetCompanyDetailsUseCase,
    private _editCompanyUseCase : EditCompanyUseCase,
    private _addOfferUseCase : AddOfferUseCase,
    private _getOffersUseCase : GetOffersUseCase,
    private _deleteOfferUseCase : DeleteOfferUseCase,
    private _applyOfferUseCase : ApplyOfferUseCase,
    private _removeOfferUseCase : RemoveOfferUseCase
  ) {}

  async signup(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    try {
      const response = await this._registerUseCase.execute(email);

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      throw new Error("error" + error);
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const response = await this._loginUseCase.execute(email, password);

      res.cookie("companyToken", response?.token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
    });

    res.cookie("companyRefreshToken", response?.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

      res.status(200).json(response);
      console.log(response);
    } catch (error) {
      console.log(error);
      throw new Error("error" + error);
    }
  }

  async confirmOtp(req: Request, res: Response): Promise<void> {
    const { otp, name, email, phone, country, password } = req.body;
    const license = req.file?.path;

    try {
      const response = await this._verifyOtpUseCase.execute({
        otp,
        name,
        email,
        phone,
        country,
        password,
        license,
      });

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async resendOtp(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      const response = await this._resendOtpUseCase.execute(email);

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      throw new Error("error" + error);
    }
  }

  async addVenue(req: Request, res: Response): Promise<void> {
    try {

      const { companyId, name, type, description, capacity,amount, address, phone, city, state } =
        req.body;
      const files = req.files as Express.MulterS3.File[];

      const imagePaths = files?.map((image) => `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${image.key}`);

      console.log(imagePaths," image pathsssssssssssssssssssssssssssssssssssssssssssssssssssss")

      const response = await this._addVenueUseCase.execute({
        companyId,
        name,
        type,
        description,
        capacity,
        amount,
        address,
        phone,
        city,
        state,
        images: imagePaths,
      });

      res.status(HttpStatusCode.OK).json(response);
    } catch (err) {
      console.log(err);
    }
  }

  async getVenues(req: Request, res: Response): Promise<void> {
    try {

      const { companyId } = req.params
      const venues = await this._getVenues.execute(companyId);
      res.status(HttpStatusCode.OK).json({ venues });
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal error" });
    }
  }

  async getListedVenues(req: Request, res: Response): Promise<void> {
    try {
      // Extract and type-check both parameters
      const { search = "", types = "", priceRange = "" } = req.query;
  
      console.log(req.query, " reqqueryyyyyyyyyyyyyy")
      
      // Convert query params to proper format
      const searchTerm = typeof search === 'string' ? search : '';
      const typeArray = typeof types === 'string' ? types.split(',').filter(Boolean) : [];
  
      let priceRangeArray: [number, number] = [0, 10000]; // Default price range
      
      if (typeof priceRange === 'string') {
        const rangeParts = priceRange.split(',').map(Number).filter(num => !isNaN(num));
        
        // Ensure that the rangeParts array has exactly 2 elements
        if (rangeParts.length === 2) {
          priceRangeArray = [rangeParts[0], rangeParts[1]]; // Assign values to priceRangeArray
        }
      }
  
      // Pass both parameters to the service
      const venues = await this._getListedVenues.execute({
        search: searchTerm,
        types: typeArray,
        priceRange: priceRangeArray
      });
  
      res.status(HttpStatusCode.OK).json({ venues });
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal error" });
    }
  }
  

  async updateVenueStatus(req: Request, res: Response): Promise<void> {
    try {
      const { venueId } = req.body;

      const id = venueId;
      const response = await this._updateVenueStatus.execute(id);

      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal error" });
    }
  }

  async getVenueDetails(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: "Invalid ID" });
      }

      const response = await this._getVenueDetailsUseCase.execute(id);
      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal error" });
    }
  }

  async editVenue(req: Request, res: Response): Promise<void> {
    try {
      const {
        id,
        name,
        type,
        description,
        capacity,
        address,
        phone,
        city,
        state,
        existingImages,
      } = req.body;
      const files = req.files as Express.Multer.File[];

      const imagePaths = files?.map((image) => image.path);

      const response = await this._editVenueUseCase.execute({
        id,
        name,
        type,
        description,
        capacity,
        address,
        phone,
        city,
        state,
        existingImages,
        imagePaths,
      });

      res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal error" });
    }
  }

  async deleteVenue(req: Request, res: Response): Promise<void> {
    try {
      const { venueId } = req.params;

      const response = await this._deleteVenueUseCase.execute(venueId);

      res.status(HttpStatusCode.OK).json(response)
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal error" });
    }
  }

  async getCompanyDetails(req: Request, res: Response): Promise<void> {
    try {
      const { companyId } = req.params;

      const response = await this._getCompanyDetailsUseCase.execute(companyId);

      res.status(HttpStatusCode.OK).json(response)
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal error" });
    }
  }

  async editCompanyProfile(req: Request, res: Response) : Promise<void> {
    try {
      const { companyId, name, phone } = req.body;

      console.log(req.body," reqbdyy in edit company")

      const response = await this._editCompanyUseCase.execute({companyId, name, phone});

      console.log(response);
      res.status(HttpStatusCode.OK).json(response)

    } catch (error) {
      console.log(error);
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal error" });
    }
  }

  async addOffer(req: Request, res: Response) : Promise<void> {
    try {
      const { companyId, values} = req.body;
      const { name, percentage, validity } = values

      console.log(req.body,"reqbdy in controller of offer")

      const response = await this._addOfferUseCase.execute({companyId, name, percentage, validity})

      res.status(HttpStatusCode.OK).json(response)
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal error" });
    }
  }

  async getOffers(req: Request, res: Response) : Promise<void> {
    try {

      const { companyId } = req.params;
      const response = await this._getOffersUseCase.execute(companyId)
      res.status(HttpStatusCode.OK).json(response)
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal error" });
    }
  }

  async deleteOffer(req: Request, res: Response) : Promise<void> {
    try {

      const { offerId } = req.params;
      console.log(offerId," offerId from contoller in offer")
      const response = await this._deleteOfferUseCase.execute(offerId)
      res.status(HttpStatusCode.OK).json(response)
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal error" });
    }
  }

  async applyOffer(req: Request, res: Response) : Promise<void> {
    try {
      const {venueId, offerId} = req.body;

      const response = await this._applyOfferUseCase.execute(venueId, offerId);

      res.status(HttpStatusCode.OK).json(response)
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal error" });
    }
  }

  async removeOffer(req: Request, res: Response) : Promise<void> {
    try {
      const {venueId} = req.params;

      const response = await this._removeOfferUseCase.execute(venueId);
      res.send(HttpStatusCode.OK).json(response)
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal error" });
    }
  }

}
