import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = Schema({
  fullname: { type: String, default: "" },
  email: {
    type: String,
    default: "",
    unique: true,
    index: true
  },
  password: { type: String, default: "" },
  user_type: { type: String, default: "user" },
  address: { type: String, default: "" },
  join_date: { type: String, default: "" },
  verified: { type: Boolean, default: false },
  verify_link: { type: String, default: "" },
  forgot_link: { type: String, default: "" }
});

let UsersModel = mongoose.model("Users", UserSchema);

export default UsersModel;
