const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  description: { type: String, required: true },
  target: { type: String, required: true },
  departDate: { type: String, required: true },
  returnDate: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true, unique: true },
  followers: [{ type: mongoose.Types.ObjectId, required: true, ref: "User" }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Vacation", userSchema);
