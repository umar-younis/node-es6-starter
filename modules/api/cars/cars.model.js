import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CarsSchema = Schema({
  user_id: Schema.ObjectId,
  title: {
    type: String,
    default: "",
    unique: true,
    index: true
  }
});

let CarsModel = mongoose.model("Cars", CarsSchema);

export default CarsModel;
