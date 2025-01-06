"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const constants_1 = require("../../constants");
class BookingController {
    constructor(_makePaymentUseCase, _webhookUseCase, _getUserBookingsUseCase, _getCompanyBookingsUseCase, _cancelBookingUseCase, _getBookingDetailsUseCase, _companyDashboardDetailsUseCase, _adminDashboardUseCase, _getBookedDates) {
        this._makePaymentUseCase = _makePaymentUseCase;
        this._webhookUseCase = _webhookUseCase;
        this._getUserBookingsUseCase = _getUserBookingsUseCase;
        this._getCompanyBookingsUseCase = _getCompanyBookingsUseCase;
        this._cancelBookingUseCase = _cancelBookingUseCase;
        this._getBookingDetailsUseCase = _getBookingDetailsUseCase;
        this._companyDashboardDetailsUseCase = _companyDashboardDetailsUseCase;
        this._adminDashboardUseCase = _adminDashboardUseCase;
        this._getBookedDates = _getBookedDates;
    }
    async makePaymentRequest(req, res) {
        try {
            const { userId, venueId, event, guests, bookingDuration, paymentMethod, offerPercentage } = req.body;
            console.log(req.body, "reqbdyyyyyyy 4545454545");
            const response = await this._makePaymentUseCase.execute(userId, venueId, event, guests, bookingDuration, paymentMethod, offerPercentage);
            res.status(constants_1.HttpStatusCode.OK).json(response);
        }
        catch (error) {
            console.log(error);
            res.status(constants_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: "failed to send request",
            });
        }
    }
    async webhook(req, res) {
        try {
            const event = req.body;
            const response = await this._webhookUseCase.execute(event);
            res.status(constants_1.HttpStatusCode.OK).json(response);
        }
        catch (error) {
            console.log(error);
            res.status(constants_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: "failed to send request",
            });
        }
    }
    async getUserBookings(req, res) {
        try {
            const { userId } = req.params;
            console.log(userId, "userId in controller of getbookings");
            const response = await this._getUserBookingsUseCase.execute(userId);
            res.status(constants_1.HttpStatusCode.OK).json(response);
        }
        catch (error) {
            console.log(error);
            res.status(constants_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: "failed to send request",
            });
        }
    }
    async getBookingDetails(req, res) {
        try {
            const { id } = req.params;
            console.log(id, "id in controller of getbookingdetailsss");
            const response = await this._getBookingDetailsUseCase.execute(id);
            res.status(constants_1.HttpStatusCode.OK).json(response);
        }
        catch (error) {
            console.log(error);
            res.status(constants_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: "failed to send request",
            });
        }
    }
    async getCompanyBookings(req, res) {
        try {
            const { companyId } = req.params;
            console.log(companyId, "companyId in controller of getbookings");
            const response = await this._getCompanyBookingsUseCase.execute(companyId);
            res.status(constants_1.HttpStatusCode.OK).json(response);
        }
        catch (error) {
            console.log(error, " ERROR IN CATCH");
            res.status(constants_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: "failed to send request",
            });
        }
    }
    async cancelBooking(req, res) {
        try {
            const { bookingId } = req.body;
            console.log(bookingId, "bookingid in controller vcance;");
            const response = await this._cancelBookingUseCase.execute(bookingId);
            res.status(constants_1.HttpStatusCode.OK).json(response);
        }
        catch (error) {
            console.log(error);
            res.status(constants_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: "failed to send request",
            });
        }
    }
    async companyDashboardDetails(req, res) {
        try {
            const { companyId } = req.params;
            console.log(companyId, "companyIddddddd");
            const response = await this._companyDashboardDetailsUseCase.execute(companyId);
            res.status(constants_1.HttpStatusCode.OK).json(response);
        }
        catch (error) {
            console.log(error);
            res.status(constants_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: "failed to send request",
            });
        }
    }
    async adminDashboardDetails(req, res) {
        try {
            const response = await this._adminDashboardUseCase.execute();
            res.status(constants_1.HttpStatusCode.OK).json(response);
        }
        catch (error) {
            console.log(error);
            res.status(constants_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: "failed to send request",
            });
        }
    }
    async getBookedDates(req, res) {
        try {
            const response = await this._getBookedDates.execute();
            res.status(constants_1.HttpStatusCode.OK).json(response);
        }
        catch (error) {
            console.log(error);
            res.status(constants_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: "failed to fetch",
            });
        }
    }
}
exports.BookingController = BookingController;
