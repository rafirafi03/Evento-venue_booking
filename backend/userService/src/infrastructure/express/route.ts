import { Router } from 'express';
import {UserController} from '../../adapters/controllers';
import { SignupUseCase } from '../../useCases';
import { UserRepository,RedisClient } from '../../repositories';
import { otpService } from '../services';

const userRepository = new UserRepository()
const otpRepository= new otpService()
const redisRepository = new RedisClient

const signupUseCase = new SignupUseCase(
    userRepository,
    redisRepository,
    otpRepository
)

const userController = new UserController(
    signupUseCase
)

const router = Router();

router.post('/register',
    (req,res,next) => {
        userController.signup(req,res,next)
    }
)

router.post('/verify-otp',
    (req,res,next) => {
        userController.verifyOtp(req,res,next)
    }
)

export default router