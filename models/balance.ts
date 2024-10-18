import mongoose from "mongoose";

const balanceSchema = new mongoose.Schema({
    current : Number,
    income : Number,
    expense : Number,
});

export default mongoose.models.Balance || mongoose.model("Balance", balanceSchema);