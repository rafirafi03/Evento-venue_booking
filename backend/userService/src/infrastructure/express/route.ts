import { Router } from "express";
import { AdminController, UserController } from "../../adapters/controllers";
import { AdminLoginUseCase, EditUserProfileUseCase, GetUsersUseCase, ResetPasswordUseCase, SignupUseCase, UserLoginUseCase, VerifyOtpUsecase, GetUserDetailsUseCase } from "../../useCases";
import { UserRepository, RedisClient } from "../../repositories";
import { otpService } from "../services";
import { AdminRepository } from "../../repositories/implementation/adminRepository";
import { ResendOtpUseCase } from "../../useCases/resendOtpUseCase";
import { BlockUserUseCase } from "../../useCases/blockUserUseCase";

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

const resendOtpUseCase = new ResendOtpUseCase(otpRepository, redisRepository)

const blockUserUseCase = new BlockUserUseCase(userRepository)

const getUserDetailsUseCase = new GetUserDetailsUseCase(userRepository)

const resetPassUseCase = new ResetPasswordUseCase(userRepository)

const editUserProfile = new EditUserProfileUseCase(userRepository)

const userController = new UserController(signupUseCase, verifyOtpUsecase, userLoginUseCase, resendOtpUseCase, getUserDetailsUseCase, resetPassUseCase, editUserProfile);

const adminController = new AdminController(adminLoginUseCase, getUsersUseCase, blockUserUseCase)

const router = Router();

router.post("/register", (req, res) => {
  userController.signup(req, res);
});

router.post("/verify-otp", (req, res) => {
  userController.verifyOtp(req, res);
});

router.post('/resend-otp', (req,res) => {
  userController.resendOtp(req,res)
})

router.post('/login', (req,res) => {
  userController.login(req,res);
})

router.post('/adminLogin', (req,res) => {
  adminController.adminLogin(req,res)
})

router.get('/get-users', (req,res) => {
  adminController.getUsers(req,res)
})

router.get('/getUserDetails/:userId', (req,res) => {
  userController.getUserDetails(req,res)
})

router.post('/blockUser', (req,res) => {
  adminController.blockUser(req,res)
})

router.patch('/resetPassword', (req,res) => {
  userController.resetPassword(req,res)
})

router.patch('/editUserProfile', (req,res) => {
  userController.editUserProfile(req,res)
})

export default router;
