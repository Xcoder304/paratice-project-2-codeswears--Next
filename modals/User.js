import { Schema, models, model } from "mongoose";
const mongoose = require("mongoose");

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, default: "" },
    phonenumber: { type: String, default: "" },
    pincode: { type: String, default: "" },
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);
