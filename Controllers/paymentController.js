import Payment from "../models/paymentsModel.js";
import { StatusCodes } from "http-status-codes"

export const createPayment = async (req, res) => {
  try {
    const { amount, category, weight, status, bank, user } = req.body;

    const newPayment = new Payment({
      amount,
      category,
      weight,
      status,
      bank,
      user
    });

    const payment = await newPayment.save();
    res.status(StatusCodes.CREATED).json(payment);
  }
  catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "An error occurred while creating the payment record" });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(StatusCodes.OK).json(payments);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while retrieving the payment record",
    });
  }
};