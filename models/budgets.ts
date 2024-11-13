import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  userId : {type : String , required : true},
  category: String,
  maximum : Number,
  theme : String,
});

export default mongoose.models.Budget || mongoose.model("Budget", budgetSchema);