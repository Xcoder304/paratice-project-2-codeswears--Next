import { Schema, models, model } from "mongoose";
const mongoose = require("mongoose");

const OrderSchema = new Schema(
  {
    orderId: { type: Number, required: true },
    userDetails: { type: Object, required: true },
    cardDetails: { type: Object, required: true },
    productsInfo: { type: Array, required: true },
    totalPrice: { type: Number, required: true },
    // status: { type: String, default: "Pending", required: true },
  },
  { timestamps: true }
);

export default models.Order || model("Order", OrderSchema);
