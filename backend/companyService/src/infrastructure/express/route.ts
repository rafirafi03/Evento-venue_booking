import { Router } from "express";
import {
  GetCompaniesUseCase,
  GetListedVenuesUseCase,
  LoginUseCase,
  RegisterUseCase,
  VerifyOtpUsecase,
  ResendOtpUseCase,
  GetRequestsUseCase,
  BlockCompanyUseCase,
  CompanyApprovalUseCase,
  AddVenueUseCase,
  GetVenuesUseCase,
  VenueStatusUseCase,
  GetVenueDetailsUseCase,
  EditVenueUseCase,
  DeleteVenueUseCase,
} from "../../useCases";
import { AdminController, CompanyController } from "../../adapters/controllers";
import { CompanyRepository } from "../../repositories/implementation/companyRepository";
import { otpService } from "../services";
import { RedisClient } from "../../repositories";
import { upload } from "../multer/multerConfig";

const router = Router();

const companyRepository = new CompanyRepository();
const otpRepository = new otpService();
const redisRepository = new RedisClient();

const registerUseCase = new RegisterUseCase(
  companyRepository,
  otpRepository,
  redisRepository
);
const loginUseCase = new LoginUseCase(companyRepository);
const verifyOtpUseCase = new VerifyOtpUsecase(
  redisRepository,
  companyRepository
);
const resendOtpUseCase = new ResendOtpUseCase(otpRepository, redisRepository);
const getCompaniesUseCase = new GetCompaniesUseCase(companyRepository);
const getRequestsUseCase = new GetRequestsUseCase(companyRepository);
const blockCompanyUseCase = new BlockCompanyUseCase(companyRepository);
const companyApprovalUseCase = new CompanyApprovalUseCase(
  companyRepository,
  otpRepository
);
const addVenueUseCase = new AddVenueUseCase(companyRepository);
const getVenuesUseCase = new GetVenuesUseCase(companyRepository);
const venueStatusUseCase = new VenueStatusUseCase(companyRepository);
const getListedVenuesUseCase = new GetListedVenuesUseCase(companyRepository);
const getVenueDetailsUseCase = new GetVenueDetailsUseCase(companyRepository);
const editVenueUseCase = new EditVenueUseCase(companyRepository);
const deleteVenueUseCase = new DeleteVenueUseCase(companyRepository)
const companyController = new CompanyController(
  registerUseCase,
  loginUseCase,
  verifyOtpUseCase,
  resendOtpUseCase,
  addVenueUseCase,
  getVenuesUseCase,
  getListedVenuesUseCase,
  venueStatusUseCase,
  getVenueDetailsUseCase,
  editVenueUseCase,
  deleteVenueUseCase
);
const adminController = new AdminController(
  getRequestsUseCase,
  getCompaniesUseCase,
  blockCompanyUseCase,
  companyApprovalUseCase
);

router.post("/register", (req, res) => {
  companyController.signup(req, res);
});

router.post("/loginCompany", (req, res) => {
  companyController.login(req, res);
});

router.post("/confirm-otp", upload.single("license"), (req, res) => {
  companyController.confirmOtp(req, res);
});

router.post("/resendOtp", (req, res) => {
  companyController.resendOtp(req, res);
});

router.get("/getCompanies", (req, res) => {
  adminController.getCompanies(req, res);
});

router.get("/getRequests", (req, res) => {
  adminController.getRequests(req, res);
});

router.post("/blockCompany", (req, res) => {
  adminController.blockCompany(req, res);
});

router.patch("/companyApproval", (req, res) => {
  adminController.companyApproval(req, res);
});

router.post("/addVenue", upload.array("images"), (req, res) => {
  companyController.addVenue(req, res);
});

router.get("/getVenues", (req, res) => {
  companyController.getVenues(req, res);
});

router.get("/getListedVenues", (req, res) => {
  companyController.getListedVenues(req, res);
});

router.post("/venueStatus", (req, res) => {
  companyController.updateVenueStatus(req, res);
});

router.get('/getVenueDetails/:id', (req, res) => {
  companyController.getVenueDetails(req,res)
})

router.put('/editVenue', upload.array('images'), (req, res) => {
  companyController.editVenue(req,res)
})

router.delete('/deleteVenue/:venueId', (req, res) => {
  companyController.deleteVenue(req,res)
})

export default router;
