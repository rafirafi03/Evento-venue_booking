import { Router } from 'express';
import {UserController} from '../../adapters/controllers';
import { SignupUseCase } from '../../useCases';
import { UserRepository } from '../../repositories';
import { otpService } from '../services';

const userRepository = new UserRepository()
const otpRepository= new otpService()

const signupUseCase = new SignupUseCase(
    userRepository,
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

export default router