const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  isAdmin: {
    type: Boolean,
  },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  vacations: [
    { type: mongoose.Types.ObjectId, required: false, ref: "Vacation" },
  ],
  cart: [{ type: mongoose.Types.ObjectId, required: false, ref: "Vacation" }],
});

module.exports = mongoose.model("User", userSchema);
 