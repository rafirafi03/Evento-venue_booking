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
  EditCompanyUseCase,
  GetCompanyDetailsUseCase,
  AddOfferUseCase,
  GetOffersUseCase,
  DeleteOfferUseCase,
  ApplyOfferUseCase,
  RemoveOfferUseCase
} from "../../useCases";
import { AdminController, CompanyController } from "../../adapters/controllers";
import { CompanyRepository } from "../../repositories/implementation/companyRepository";
import { otpService } from "../services";
import { RedisClient } from "../../repositories";
import { upload } from "../multer/multerConfig";
import { authMiddleware } from "evento-library";

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
const deleteVenueUseCase = new DeleteVenueUseCase(companyRepository);
const getCompanyDetailsUseCase = new GetCompanyDetailsUseCase(companyRepository);
const editCompanyUseCase = new EditCompanyUseCase(companyRepository);
const addOfferUseCase = new AddOfferUseCase(companyRepository);
const getOffersUseCase = new GetOffersUseCase(companyRepository);
const deleteOfferUseCase = new DeleteOfferUseCase(companyRepository);
const applyOfferUseCase = new ApplyOfferUseCase(companyRepository);
const removeOfferUseCase = new RemoveOfferUseCase(companyRepository);


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
  deleteVenueUseCase,
  getCompanyDetailsUseCase,
  editCompanyUseCase,
  addOfferUseCase,
  getOffersUseCase,
  deleteOfferUseCase,
  applyOfferUseCase,
  removeOfferUseCase
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

router.get("/getVenues/:companyId", (req, res) => {
  companyController.getVenues(req, res);
});

router.get("/getListedVenues", authMiddleware(['user','company']), (req, res) => {
  companyController.getListedVenues(req, res);
});

router.post("/venueStatus", (req, res) => {
  companyController.updateVenueStatus(req, res);
});

router.get('/getVenueDetails/:id', authMiddleware(['user','company']), (req, res) => {
  companyController.getVenueDetails(req,res)
})

router.put('/editVenue', upload.array('images'), (req, res) => {
  companyController.editVenue(req,res)
})

router.delete('/deleteVenue/:venueId', (req, res) => {
  companyController.deleteVenue(req,res)
})

router.get('/getCompanyDetails/:companyId' , (req, res) => {
  companyController.getCompanyDetails(req,res)
})

router.patch('/editCompanyProfile', (req,res) => {
  companyController.editCompanyProfile(req,res)
})

router.post('/addOffer', (req, res) => {
  companyController.addOffer(req, res);
})

router.get('/getOffers/:companyId', (req, res) => {
  companyController.getOffers(req, res)
})

router.delete('/deleteOffer/:offerId', (req, res) => {
  companyController.deleteOffer(req, res)
})

router.patch('/applyOffer', (req, res) => {
  companyController.applyOffer(req, res)
})

router.patch('/removeOffer', (req, res) => {
  companyController.removeOffer(req, res)
})

export default router;
