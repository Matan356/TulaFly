const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  lastName:{type:String, required:true},
  userName:{type:String, required:true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  vacations: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Vacation' }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
