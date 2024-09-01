import { Router } from 'express';
import {UserController} from '../../adapters/controllers';
import { SignupUseCase,VerifyOtpUsecase } from '../../useCases';
import { UserRepository,RedisClient } from '../../repositories';
import { otpService } from '../services';

const userRepository = new UserRepository()
const otpRepository= new otpService()
const redisRepository = new RedisClient()

const signupUseCase = new SignupUseCase(
    userRepository,
    redisRepository,
    otpRepository
)

const verifyOtpUsecase = new VerifyOtpUsecase(
    redisRepository,
    userRepository
)

const userController = new UserController(
    signupUseCase,
    verifyOtpUsecase
)

const router = Router();

router.post('/register',
    (req,res,next) => {
        userController.signup(req,res,next)
    }
)

router.post('/verify-otp',
    (req,res,next) => {
        console.log(req.body,"reqbdyotppass")
        userController.verifyOtp(req,res,next)
    }
)

export default router