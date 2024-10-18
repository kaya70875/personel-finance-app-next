import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  category: String,
  maximum : Number,
  theme : String,
});

export default mongoose.models.Budget || mongoose.model("Budget", budgetSchema);