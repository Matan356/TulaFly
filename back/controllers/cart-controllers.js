const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Vacation = require("../models/vacation");
const User = require("../models/user");

const addVacationToCart = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty() || req.params.uid == undefined) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const vacationId = req.params.vid;
  const userId = req.params.uid;
  let existVacation = await Vacation.findById(vacationId);
  let existUser = await User.findById(userId);

  const userVacations = existUser.cart.find((x) => x == existVacation.id);

  if (userVacations == vacationId) {
    const error = new HttpError(
      "You will not be able to add this vacation. The vacation already exists in the cart.",
      500
    );
    return next(error);
  }
  if (!userId) {
    const error = new HttpError(
      "Could You will not be able to add this vacation to the cart, you are need signup/login first.",
      500
    );
    return next(error);
  }
  try {
    existUser.cart.push(existVacation);
    await existUser.save();
  } catch (err) {
    const error = new HttpError(
      "You will not be able to add this vacation to the cart.",
      500
    );
    return next(error);
  }
  res.status(200).json({ existUser });
};

const deleteVacationFromCart = async (req, res, next) => {
  const vacationId = req.params.vid;
  const userId = req.params.uid;
  let existUser = await User.findById(userId);
  const userCart = existUser.cart.find((x) => x == vacationId);

  if (!userCart) {
    const error = new HttpError(
      "Something went wrong, Could not delete this vacation from cart .",
      500
    );
    return next(error);
  }
  try {
    updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { cart: vacationId } },
      { new: true }
    );
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete this vacation from cart.",
      500
    );
    return next(error);
  }
  res.status(200).json({ updatedUser });
};

const getCartVacations = async (req, res, next) => {
  const userId = req.params.uid;
  let userCart;
  let existUser;
  try {
    existUser = await User.findById(userId);
    userCart = existUser.cart;
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a vacations in your cart.",
      500
    );
    return next(error);
  }
  res.status(200).json({ userCart });
};

exports.getCartVacations = getCartVacations;
exports.deleteVacationFromCart = deleteVacationFromCart;
exports.addVacationToCart = addVacationToCart;
