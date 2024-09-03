import { Router } from "express";
import { AdminController, UserController } from "../../adapters/controllers";
import { AdminLoginUseCase, SignupUseCase, VerifyOtpUsecase } from "../../useCases";
import { UserRepository, RedisClient } from "../../repositories";
import { otpService } from "../services";

const userRepository = new UserRepository();
const otpRepository = new otpService();
const redisRepository = new RedisClient();

const signupUseCase = new SignupUseCase(
  userRepository,
  redisRepository,
  otpRepository
);

const adminLoginUseCase = new AdminLoginUseCase(userRepository)

const verifyOtpUsecase = new VerifyOtpUsecase(redisRepository, userRepository);

const userController = new UserController(signupUseCase, verifyOtpUsecase);

const adminController = new AdminController(adminLoginUseCase)

const router = Router();

router.post("/register", (req, res, next) => {
  userController.signup(req, res, next);
});

router.post("/verify-otp", (req, res, next) => {
  userController.verifyOtp(req, res, next);
});

router.post('/adminLogin', (req,res,next) => {
  adminController.adminLogin(req,res,next)
})

export default router;
