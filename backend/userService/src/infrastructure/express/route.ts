import { Router } from "express";
import { AdminController, UserController } from "../../adapters/controllers";
import { AdminLoginUseCase, EditUserProfileUseCase, GetUsersUseCase, ResetPasswordUseCase, SignupUseCase, UserLoginUseCase, VerifyOtpUsecase, GetUserDetailsUseCase, AddToFavouritesUseCase, CheckFavouritesUseCase, ForgetPasswordRequest, ChangePasswordUseCase } from "../../useCases";
import { UserRepository, RedisClient } from "../../repositories";
import { otpService } from "../services";
import { AdminRepository } from "../../repositories/implementation/adminRepository";
import { ResendOtpUseCase } from "../../useCases/resendOtpUseCase";
import { BlockUserUseCase } from "../../useCases/blockUserUseCase";
import { GetFavouritesUseCase } from "../../useCases/getFavouritesUseCase";
import { DeleteFromFavouritesUseCase } from "../../useCases/deleteFromFavouritesUseCase";
import { authMiddleware } from "evento-library";

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

const addToFavouritesUseCase = new AddToFavouritesUseCase(userRepository)

const checkFavouritesUseCase = new CheckFavouritesUseCase(userRepository)

const editUserProfile = new EditUserProfileUseCase(userRepository)

const getFavouritesUseCase = new GetFavouritesUseCase(userRepository)

const delteFromFavouritesUseCase = new DeleteFromFavouritesUseCase(userRepository)

const forgetPasswordRequest = new ForgetPasswordRequest(otpRepository, userRepository, redisRepository)

const changePasswordUseCase = new ChangePasswordUseCase(userRepository, redisRepository);

const userController = new UserController(signupUseCase, verifyOtpUsecase, userLoginUseCase, resendOtpUseCase, getUserDetailsUseCase, resetPassUseCase, editUserProfile, addToFavouritesUseCase, checkFavouritesUseCase, getFavouritesUseCase, delteFromFavouritesUseCase, forgetPasswordRequest, changePasswordUseCase);

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

router.get('/get-users',authMiddleware(['admin']), (req,res) => {
  adminController.getUsers(req,res)
})

router.get('/getUserDetails/:userId', authMiddleware(['admin', 'user']), (req,res) => {
  userController.getUserDetails(req,res)
})

router.post('/blockUser', authMiddleware(['admin']), (req,res) => {
  adminController.blockUser(req,res)
})

router.patch('/resetPassword', authMiddleware(['user']), (req,res) => {
  userController.resetPassword(req,res)
})

router.patch('/editUserProfile',authMiddleware(['user']), (req,res) => {
  userController.editUserProfile(req,res)
})

router.post('/addToFavourites',authMiddleware(['user']), (req, res) => {
  userController.addToFavourites(req,res)
})

router.get('/checkFavourites/:userId/:venueId',authMiddleware(['user']), (req, res) => {
  userController.checkFavourites(req,res)
})

router.get('/getFavourites/:userId',authMiddleware(['user']), (req,res) => {
  userController.getFavourites(req, res)
})

router.delete('/deleteFromFavourites/:userId/:venueId',authMiddleware(['user']), (req, res) => {
  userController.deleteFromFavourites(req, res)
})

router.post('/forgetPasswordRequest',authMiddleware(['user']), (req, res) => {
  userController.forgetPasswordRequest(req, res)
})

router.put('/changePassword',authMiddleware(['user']), (req, res) => {
  userController.changePassword(req, res)
})



export default router;
