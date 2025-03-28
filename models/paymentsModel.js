import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    required: true
  },
  accountName: {
    type: String,
    required: true
  },
  bankName: {
    type: String,
    required: true
  },
  branchCode: {
    type: String,
    required: true
  }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});


const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  bank: [bankSchema],
  user: [userSchema]
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);
