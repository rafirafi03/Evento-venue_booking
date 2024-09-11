import { Router } from 'express';
import { RegisterUseCase, VerifyOtpUsecase } from '../../useCases';
import { CompanyController } from '../../adapters/controllers'; 
import { CompanyRepository }  from '../../repositories/implementation/companyRepository'
import { otpService } from '../services';
import { RedisClient } from '../../repositories';
import { ResendOtpUseCase } from '../../useCases/resendOtpUseCase';
// import upload from '../multer/multerConfig'

const router = Router();

const companyRepository = new CompanyRepository();
const otpRepository = new otpService()
const redisRepository = new RedisClient()

const registerUseCase = new RegisterUseCase(companyRepository,otpRepository,redisRepository)
const verifyOtpUseCase = new VerifyOtpUsecase(redisRepository,companyRepository)
const resendOtpUseCase = new ResendOtpUseCase(otpRepository,redisRepository)
const companyController = new CompanyController(registerUseCase, verifyOtpUseCase, resendOtpUseCase)

router.post("/register", (req,res) => {
    companyController.signup(req,res)
})

router.post('/confirm-otp', (req,res) => {
    companyController.confirmOtp(req,res)
})

router.post('resendOtp', (req,res) => {
    companyController.resendOtp(req,res)
})


export default router