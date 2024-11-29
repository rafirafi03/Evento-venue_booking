import { Router } from "express";
import { BookingController } from "../../adapters/controllers";
import {
  MakePaymentUseCase,
  WebhookUseCase,
  GetUserBookingsUseCase,
  CancelBookingUseCase,
  GetCompanyBookingsUseCase,
} from "../../useCases";
import { BookingRepository } from "../../repositories";

const router = Router();

const bookingRepository = new BookingRepository();

const makePaymentUseCase = new MakePaymentUseCase();
const webhookUseCase = new WebhookUseCase(bookingRepository);
const getBookingsByUserId = new GetUserBookingsUseCase(bookingRepository);
const getCompanyBookingsUseCase = new GetCompanyBookingsUseCase(
  bookingRepository
);
const cancelBookingUseCase = new CancelBookingUseCase(bookingRepository);

const bookingController = new BookingController(
  makePaymentUseCase,
  webhookUseCase,
  getBookingsByUserId,
  getCompanyBookingsUseCase,
  cancelBookingUseCase
);

router.post("/makePayment", (req, res) => {
  bookingController.makePaymentRequest(req, res);
});

router.post("/api/webhook", (req, res) => {
  bookingController.webhook(req, res);
});

router.get("/getUserBookings/:userId", (req, res) => {
  bookingController.getUserBookings(req, res);
});

router.get("/getCompanyBookings/:companyId", (req, res) => {
  bookingController.getCompanyBookings(req, res);
});

router.delete("/cancelBooking", (req, res) => {
  bookingController.cancelBooking(req, res);
});

export default router;
