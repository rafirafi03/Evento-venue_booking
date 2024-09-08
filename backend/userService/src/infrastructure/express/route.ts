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

router.post("/register", (req, res) => {
  userController.signup(req, res);
});

router.post("/verify-otp", (req, res) => {
  userController.verifyOtp(req, res);
});

router.post('/login', (req,res) => {
  userController.login(req,res);
})

router.post('/adminLogin', (req,res) => {
  adminController.adminLogin(req,res)
})

router.get('/get-users', (req,res) => {
  adminController.getUsers(req,res)
})

export default router;
