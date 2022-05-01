const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vacationSchema = new Schema({
  description: { type: String, required: true },
  target: { type: String, required: true },
  departDate: { type: String, required: true },
  returnDate: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  followers: [{ type: mongoose.Types.ObjectId, required: false, ref: "User" }],

});

module.exports = mongoose.model("Vacation", vacationSchema);
