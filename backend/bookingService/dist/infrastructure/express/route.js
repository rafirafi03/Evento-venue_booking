"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../adapters/controllers");
const useCases_1 = require("../../useCases");
const repositories_1 = require("../../repositories");
const evento_library_1 = require("evento-library");
const router = (0, express_1.Router)();
const bookingRepository = new repositories_1.BookingRepository();
const makePaymentUseCase = new useCases_1.MakePaymentUseCase(bookingRepository);
const webhookUseCase = new useCases_1.WebhookUseCase(bookingRepository);
const getBookingsByUserId = new useCases_1.GetUserBookingsUseCase(bookingRepository);
const getCompanyBookingsUseCase = new useCases_1.GetCompanyBookingsUseCase(bookingRepository);
const cancelBookingUseCase = new useCases_1.CancelBookingUseCase(bookingRepository);
const getBookingDetailsUseCase = new useCases_1.GetBookingDetailsUseCase(bookingRepository);
const companyDashboardDetailsuseCase = new useCases_1.CompanyDashboardDetailsUseCase(bookingRepository);
const adminDashboardUseCase = new useCases_1.AdminDashboardUseCase(bookingRepository);
const bookedDatesUseCase = new useCases_1.GetBookedDatesUseCase(bookingRepository);
const bookingController = new controllers_1.BookingController(makePaymentUseCase, webhookUseCase, getBookingsByUserId, getCompanyBookingsUseCase, cancelBookingUseCase, getBookingDetailsUseCase, companyDashboardDetailsuseCase, adminDashboardUseCase, bookedDatesUseCase);
router.post("/makePayment", (0, evento_library_1.authMiddleware)(['user']), (req, res) => {
    bookingController.makePaymentRequest(req, res);
});
router.post("/api/webhook", (req, res) => {
    bookingController.webhook(req, res);
});
router.get("/getUserBookings/:userId", (0, evento_library_1.authMiddleware)(['company', 'user']), (req, res) => {
    bookingController.getUserBookings(req, res);
});
router.get("/getCompanyBookings/:companyId", (0, evento_library_1.authMiddleware)(['company']), (req, res) => {
    bookingController.getCompanyBookings(req, res);
});
router.patch("/cancelBooking", (0, evento_library_1.authMiddleware)(['user']), (req, res) => {
    bookingController.cancelBooking(req, res);
});
router.get('/getBookingDetails/:id', (0, evento_library_1.authMiddleware)(['company', 'user']), (req, res) => {
    bookingController.getBookingDetails(req, res);
});
router.get('/getCompanyDashboardDetails/:companyId', (0, evento_library_1.authMiddleware)(['company']), (req, res) => {
    bookingController.companyDashboardDetails(req, res);
});
router.get('/getAdminDashboard', (0, evento_library_1.authMiddleware)(['admin']), (req, res) => {
    bookingController.adminDashboardDetails(req, res);
});
router.get('/getBookedDates', (req, res) => {
    bookingController.getBookedDates(req, res);
});
exports.default = router;
