import { Schema, models, model } from "mongoose";

const mongoose = require("mongoose");

// main().catch((err) => console.log(err));

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    availableQty: { type: Number, required: true },
    userSelectedQty: { type: Number, required: true },
  },
  { timestamps: true }
);

export default models.Product || model("Product", ProductSchema);
