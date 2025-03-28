import { Router } from "express";
import { createPayment, getAllPayments } from '../Controllers/paymentController.js';

const router = Router();

//Route
router.post('/', createPayment);
router.get('/', getAllPayments);

export default router;