const { Schema, model, Types } = require("mongoose");

const URL_PATTERN = /^https?:\/\/.+$/i;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    min: [2, "Crypto name must be at least 2 characters long."],
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: (value) => URL_PATTERN.test(value),
      message: "Image URL is not valid",
    },
  },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => value >= 0,
      message: "Price must be positive",
    },
  },
  description: {
    type: String,
    required: true,
    min: [10, "Crypto description must be at least 10 characters long."],
  },
  method: {
    type: String,
    enum: ["crypto-wallet", "credit-card", "debit-card", "paypal"],
  },
  subscribeList: { type: [Types.ObjectId], ref: "User", default: [] },
  owner: { type: Types.ObjectId, ref: "User", required: true },
});

const Item = model("Item", itemSchema);

module.exports = Item;
