import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({
    User_ID: {
        type: String,
        required: false,
    },
    Account_Number: {
        type: String,
        required: false,
    },
    Account_Name: {
        type: String,
        required: false,
    },
    Bank_Name: {
        type: String,
        required: false,
    },
    Branch_Code : {
        type: String,
        required: false,
    },
  });



export default mongoose.model('Bank', bankSchema);