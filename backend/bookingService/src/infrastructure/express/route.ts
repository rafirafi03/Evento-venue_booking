import { Router } from "express";
import { BookingController } from '../../adapters/controllers'
import { MakePaymentUseCase, WebhookUseCase } from "../../useCases";
import { BookingRepository }  from "../../repositories/implementations";

const router = Router();

const bookingRepository = new BookingRepository()

const makePaymentUseCase = new MakePaymentUseCase();
const webhookUseCase = new WebhookUseCase(bookingRepository)

const bookingController = new BookingController(makePaymentUseCase, webhookUseCase);

router.post("/makePayment", (req, res) => {
  bookingController.makePaymentRequest(req, res);
});

router.post('/api/webhook', (req, res) => {
  bookingController.webhook(req, res)
})

export default router;
