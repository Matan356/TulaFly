const user = require("../models/user");
const HttpError = require('../models/http-error');

module.exports = async (req, res, next) => {
  const userId = req.params.aid;
  let checkAdmin;
  try {
    checkAdmin = await user.findById(userId);
    checkAdmin ? next() : false;
  } catch (err) {
    console.log(err);
    const error = new HttpError("Authentication failed!", 403);
    return next(error);
  }
};
