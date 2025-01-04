import { Router } from "express";
import { BookingController } from "../../adapters/controllers";
import {
  MakePaymentUseCase,
  WebhookUseCase,
  GetUserBookingsUseCase,
  CancelBookingUseCase,
  GetCompanyBookingsUseCase,
  GetBookingDetailsUseCase,
  CompanyDashboardDetailsUseCase,
  AdminDashboardUseCase,
  GetBookedDatesUseCase
} from "../../useCases";
import { BookingRepository } from "../../repositories";
import { authMiddleware } from "evento-library";

const router = Router();

const bookingRepository = new BookingRepository();

const makePaymentUseCase = new MakePaymentUseCase(bookingRepository);
const webhookUseCase = new WebhookUseCase(bookingRepository);
const getBookingsByUserId = new GetUserBookingsUseCase(bookingRepository);
const getCompanyBookingsUseCase = new GetCompanyBookingsUseCase(
  bookingRepository
);
const cancelBookingUseCase = new CancelBookingUseCase(bookingRepository);
const getBookingDetailsUseCase = new GetBookingDetailsUseCase(bookingRepository);
const companyDashboardDetailsuseCase = new CompanyDashboardDetailsUseCase(bookingRepository)
const adminDashboardUseCase = new AdminDashboardUseCase(bookingRepository)
const bookedDatesUseCase = new GetBookedDatesUseCase(bookingRepository)

const bookingController = new BookingController(
  makePaymentUseCase,
  webhookUseCase,
  getBookingsByUserId,
  getCompanyBookingsUseCase,
  cancelBookingUseCase,
  getBookingDetailsUseCase,
  companyDashboardDetailsuseCase,
  adminDashboardUseCase,
  bookedDatesUseCase
);

router.post("/makePayment", authMiddleware(['user']), (req, res) => {
  bookingController.makePaymentRequest(req, res);
});

router.post("/api/webhook", (req, res) => {
  bookingController.webhook(req, res);
});

router.get("/getUserBookings/:userId", authMiddleware(['company','user']), (req, res) => {
  bookingController.getUserBookings(req, res);
});

router.get("/getCompanyBookings/:companyId", authMiddleware(['company']), (req, res) => {
  bookingController.getCompanyBookings(req, res);
});

router.patch("/cancelBooking", authMiddleware(['user']), (req, res) => {
  bookingController.cancelBooking(req, res);
});

router.get('/getBookingDetails/:id', authMiddleware(['company','user']), (req, res) => {
  bookingController.getBookingDetails(req, res)
})

router.get('/getCompanyDashboardDetails/:companyId',authMiddleware(['company']), (req, res) => {
  bookingController.companyDashboardDetails(req, res)
})

router.get('/getAdminDashboard',authMiddleware(['admin']), (req, res) => {
  bookingController.adminDashboardDetails(req, res)
})

router.get('/getBookedDates', (req, res) => {
  bookingController.getBookedDates(req, res)
})

export default router;
