import { Router } from 'express';
import { RegisterUseCase, VerifyOtpUsecase } from '../../useCases';
import { CompanyController } from '../../adapters/controllers'; 
import { CompanyRepository }  from '../../repositories/implementation/companyRepository'
import { otpService } from '../services';
import { RedisClient } from '../../repositories';

const router = Router();

const companyRepository = new CompanyRepository();
const otpRepository = new otpService()
const redisRepository = new RedisClient()

const registerUseCase = new RegisterUseCase(companyRepository,otpRepository,redisRepository)
const verifyOtpUseCase = new VerifyOtpUsecase(redisRepository,companyRepository)
const companyController = new CompanyController(registerUseCase, verifyOtpUseCase)

router.post("/register", (req,res,next) => {
    companyController.signup(req,res,next)
})

router.post('/confirm-otp', (req,res,next) => {
    companyController.confirmOtp(req,res,next)
})

export default router