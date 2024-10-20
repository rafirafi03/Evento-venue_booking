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
  EditCompanyUseCase
} from "../../useCases";
import { HttpStatusCode } from "../../constants";
import { GetCompanyDetailsUseCase } from "../../useCases/getCompanyDetailsUseCase";

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
    private _editCompanyUseCase : EditCompanyUseCase
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

      const { name, type, description, capacity, address, phone, city, state } =
        req.body;
      const files = req.files as Express.Multer.File[];

      const imagePaths = files?.map((image) => image.path);

      const response = await this._addVenueUseCase.execute({
        name,
        type,
        description,
        capacity,
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
      const venues = await this._getVenues.execute();
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
      const venues = await this._getListedVenues.execute();
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

}
