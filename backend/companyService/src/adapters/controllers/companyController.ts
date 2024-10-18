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
  DeleteVenueUseCase
} from "../../useCases";
import { HttpStatusCode } from "../../constants";

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
    private _deleteVenueUseCase : DeleteVenueUseCase
  ) {}

  async signup(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    console.log(req.body, "reqbdyyycntrlrr");

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

      console.log(email, "emailcontroller", password, "pass controller");
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

    console.log(req.body, "reqbdyyyyycntrlrcpmny");
    console.log(req.file, "reqfileeeecntrlrcpmny");
    // const {license} = req.file;

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

      console.log(response, "response companycontroller");

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
      console.log(req.body, "reqbdyyyyyyyyyy");
      console.log(req.files, "reqflssssssssss1234");

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
      console.log("hiiii iam in companycntrllr");
      const venues = await this._getVenues.execute();
      console.log(venues, "vnssss companycntrllr");
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
      console.log("hiiii iam in companycntrllr");
      const venues = await this._getListedVenues.execute();
      console.log(venues, "vnssss companycntrllr");
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
}
