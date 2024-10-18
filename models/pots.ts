import mongoose from "mongoose";

const potsSchema = new mongoose.Schema({
    name : String,
    target : Number,
    total : Number,
    theme : String,
});

export default mongoose.models.Pot || mongoose.model('Pot', potsSchema);