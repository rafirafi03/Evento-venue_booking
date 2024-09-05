import { Router } from "express";
import { AdminController, UserController } from "../../adapters/controllers";
import { AdminLoginUseCase, GetUsersUseCase, SignupUseCase, UserLoginUseCase, VerifyOtpUsecase } from "../../useCases";
import { UserRepository, RedisClient } from "../../repositories";
import { otpService } from "../services";
import { AdminRepository } from "../../repositories/implementation/adminRepository";

const userRepository = new UserRepository();
const adminRepository = new AdminRepository()
const otpRepository = new otpService();
const redisRepository = new RedisClient();

const signupUseCase = new SignupUseCase(
  userRepository,
  redisRepository,
  otpRepository
);

const adminLoginUseCase = new AdminLoginUseCase(userRepository)

const getUsersUseCase = new GetUsersUseCase(adminRepository)

const userLoginUseCase = new UserLoginUseCase(userRepository)

const verifyOtpUsecase = new VerifyOtpUsecase(redisRepository, userRepository);

const userController = new UserController(signupUseCase, verifyOtpUsecase, userLoginUseCase);

const adminController = new AdminController(adminLoginUseCase, getUsersUseCase)

const router = Router();

router.post("/register", (req, res, next) => {
  userController.signup(req, res, next);
});

router.post("/verify-otp", (req, res, next) => {
  userController.verifyOtp(req, res, next);
});

router.post('/login', (req,res,next) => {
  userController.login(req,res,next);
})

router.post('/adminLogin', (req,res,next) => {
  adminController.adminLogin(req,res,next)
})

router.get('/get-users', (req,res,next) => {
  adminController.getUsers(req,res,next)
})

export default router;
