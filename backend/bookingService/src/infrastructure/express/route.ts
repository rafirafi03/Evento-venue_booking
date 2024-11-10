import { Router } from "express";
import { BookingController } from '../../controllers/bookingController'
import { MakePaymentUseCase } from "../../useCases";

const router = Router();

const makePaymentUseCase = new MakePaymentUseCase()

const bookingController = new BookingController(makePaymentUseCase)

router.post('/makePayment', (req, res) => {
    bookingController.makePaymentRequest(req, res)
  })

export default router;
