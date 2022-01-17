import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    description: { type: String, required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    type: { type: Number, required: true },
    category: { type: String, required: true },
    account: { type: String, required: true },
    createdAt: { type: Date, default: new Date },
}, { timestamps: true});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;