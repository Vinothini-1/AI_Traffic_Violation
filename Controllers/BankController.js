import Bank from "../models/BankModel.js";
import { StatusCodes } from "http-status-codes";

export const createBank = async (req, res) => {
  try {
    const { User_ID, Account_Number, Account_Name, Bank_Name, Branch_Code } = req.body;

    // findOneAndUpdate will update the document if it exists, or create a new one if it doesn't
    const bank = await Bank.findOneAndUpdate(
      { User_ID }, // Criteria to find the existing record
      { Account_Number, Account_Name, Bank_Name, Branch_Code }, // Data to update
      { new: true, upsert: true } // Options: create a new record if it doesn't exist
    );

    res.status(StatusCodes.CREATED).json(bank);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "An error occurred while creating the bank record" });
  }
};
// Controller to get a bank record by User_ID
export const getBankById = async (req, res) => {
  try {
    const bankRecord = await Bank.findOne({ User_ID: req.params.User_ID });
    if (!bankRecord) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Bank record not found" });
    }
    res.status(StatusCodes.OK).json(bankRecord);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "An error occurred while retrieving the bank record" });
  }
};

// Controller to update a bank record by _id
export const updateBank = async (req, res) => {
  try {
    const { id } = req.params; // Extracting the _id from the request parameters
    const bankRecord = await Bank.findByIdAndUpdate(id, req.body, {
      new: true,
    }); // Updating the bank record

    if (!bankRecord) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Bank record not found" });
    }

    res.status(StatusCodes.OK).json(bankRecord);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "An error occurred while updating the bank record" });
  }
};

// Controller to delete a bank record by _id
export const deleteBank = async (req, res) => {
  try {
    const { id } = req.params.id;
    const bankRecord = await Bank.findByIdAndDelete(req.params.id);
    if (!bankRecord) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Bank record not found" });
    }
    res
      .status(StatusCodes.OK)
      .json({ message: "Bank record deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "An error occurred while deleting the bank record" });
  }
};
