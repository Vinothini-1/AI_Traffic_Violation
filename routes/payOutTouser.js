import { Router } from "express";
import { payoutToUser } from "../Controllers/PayOuttoUser.js";


const router = Router();

router.post('/', async (req, res) => {
    const { customerId, fullAmount, accountDetails } = req.body;
    
    try {
      const payoutResult = await payoutToUser({
        customerId,
        amount: fullAmount,
        bankAccountDetails: accountDetails,
      });
  
      res.status(200).json({
        success: true,
        message: 'Payment transfer successful',
        payoutDetails: payoutResult,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Payment transfer failed',
      });
    }
  });

  export default router;