import { Router } from "express";
import upload from "../middleware/multerMiddleware.js";

const router = Router();

import { createBank, getBankById, updateBank, deleteBank } from '../Controllers/BankController.js';
console.log("Inside")
// Define routes for bank-related operations
router.post('/', createBank);
router.get('/:User_ID', getBankById);
router.patch('/:id', updateBank);
router.delete('/:id', deleteBank);

export default router;