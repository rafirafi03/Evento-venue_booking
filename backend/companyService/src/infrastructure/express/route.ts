import { Router } from 'express';
import { GetCompaniesUseCase, LoginUseCase, RegisterUseCase, VerifyOtpUsecase } from '../../useCases';
import { AdminController, CompanyController } from '../../adapters/controllers'; 
import { CompanyRepository }  from '../../repositories/implementation/companyRepository'
import { otpService } from '../services';
import { RedisClient } from '../../repositories';
import { ResendOtpUseCase } from '../../useCases/resendOtpUseCase';
import { GetRequestsUseCase } from '../../useCases/getRequestsUseCase';
import { BlockCompanyUseCase } from '../../useCases/blockCompanyUseCase';
// import upload from '../multer/multerConfig'

const router = Router();

const companyRepository = new CompanyRepository();
const otpRepository = new otpService()
const redisRepository = new RedisClient()

const registerUseCase = new RegisterUseCase(companyRepository,otpRepository,redisRepository)
const loginUseCase = new LoginUseCase(companyRepository)
const verifyOtpUseCase = new VerifyOtpUsecase(redisRepository,companyRepository)
const resendOtpUseCase = new ResendOtpUseCase(otpRepository,redisRepository)
const getCompaniesUseCase = new GetCompaniesUseCase(companyRepository)
const getRequestsUseCase = new GetRequestsUseCase(companyRepository)
const blockCompanyUseCase = new BlockCompanyUseCase(companyRepository)
const companyController = new CompanyController(registerUseCase,loginUseCase, verifyOtpUseCase, resendOtpUseCase,)
const adminController = new AdminController(getRequestsUseCase, getCompaniesUseCase, blockCompanyUseCase)

router.post("/register", (req,res) => {
    companyController.signup(req,res)
})

router.post("/loginCompany", (req,res) => {
    companyController.login(req,res)
})

router.post('/confirm-otp', (req,res) => {
    companyController.confirmOtp(req,res)
})

router.post('/resendOtp', (req,res) => {
    companyController.resendOtp(req,res)
})

router.get('/getCompanies', (req,res) => {
    adminController.getCompanies(req,res)
})

router.get('/getRequests', (req,res) => {
    adminController.getRequests(req,res)
})

router.post('/blockCompany', (req,res) => {
    adminController.blockCompany(req,res)
})

export default router