const { Schema, model, Types } = require("mongoose");

const URL_PATTERN = /^https?:\/\/.+$/i;

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "Title must be at least 3 characters long."],
    maxlength: [50, "Title must be up to 50 characters long."],
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: (value) => URL_PATTERN.test(value),
      message: "Image URL is not valid",
    },
  },
  description: {
    type: String,
    required: true,
    minlength: [10, "Content must be at least 10 characters long."],
  },
  category: {
    type: String,
    required: true,
    minlength: [3, "Category must be at least 10 characters long."],
  },
  subscribeList: { type: [Types.ObjectId], ref: "User", default: [] },
  owner: { type: Types.ObjectId, ref: "User", required: true },
});

const Item = model("Item", itemSchema);

module.exports = Item;
