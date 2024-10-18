import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  avatar: String,
  name: String,
  category: String,
  date: Date,
  amount: Number,
  recurring: Boolean,
});

export default mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
