import { Router } from "express";
import { BookingController } from "../../controllers/bookingController";
import { MakePaymentUseCase, WebhookUseCase } from "../../useCases";

const router = Router();

const makePaymentUseCase = new MakePaymentUseCase();
const webhookUseCase = new WebhookUseCase()

const bookingController = new BookingController(makePaymentUseCase, webhookUseCase);

router.post("/makePayment", (req, res) => {
  bookingController.makePaymentRequest(req, res);
});

router.post('/api/webhook', (req, res) => {
  bookingController.webhook(req, res)
})

export default router;
