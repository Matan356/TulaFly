const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Vacation = require("../models/vacation");
const User = require("../models/user");
const { json } = require("express");

const createVacation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { description, target, departDate, returnDate, price, image } =
    req.body;

  const createdVacation = new Vacation({
    description,
    target,
    departDate,
    returnDate,
    price,
    image,
  });

  try {
    await createdVacation.save();
  } catch (err) {
    const error = new HttpError(
      "Creating Vacation failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ vacation: createdVacation });
};

const getVacations = async (req, res, next) => {
  let existVacations;
  try {
    existVacations = await Vacation.find();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a vacations.",
      500
    );
    return next(error);
  }
  res.status(201).json({ vacation: existVacations });
};

const updateVacation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { description, departDate, returnDate, price } = req.body;
  const vacationId = req.params.vid;
  let vacation;
  try {
    vacation = await Vacation.findById(vacationId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update vacation.",
      500
    );
    return next(error);
  }

  vacation.description = description;
  vacation.departDate = departDate;
  vacation.returnDate = returnDate;
  vacation.price = price;

  try {
    await vacation.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update vacation.",
      500
    );
    return next(error);
  }

  res.status(200).json({ vacation: vacation.toObject({ getters: true }) });
};

const deleteVacation = async (req, res, next) => {
  const vacationId = req.params.vid;

  let updatedUser;
  let vacation;
  let users;
  try {
    users = await User.find({ vacations: vacationId });
    vacation = await Vacation.findById(vacationId);
    updatedUser = users.map(
      async (x) =>
        await User.findByIdAndUpdate(
          x.id,
          { $pull: { vacations: vacationId } },
          { new: true }
        )
    );
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete vacation.",
      500
    );
    return next(error);
  }

  if (!vacation) {
    const error = new HttpError("Could not find vacation.", 404);
    return next(error);
  }

  try {
    await vacation.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete vacation.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted vacation." });
};

const addVacationToUser = async (req, res, next) => {
  const userId = req.params.uid;
  const vacationId = req.params.vid;

  let existVacation = await Vacation.findById(vacationId);
  let existUser = await User.findById(userId);

  const userVacation = existUser.vacations.find((x) => x == existVacation.id);

  if (userVacation == vacationId) {
    const error = new HttpError(
      "Could not follow for this vacation, you are already following.",
      500
    );
    return next(error);
  }

  try {
    existUser.vacations.push(existVacation);
    existVacation.followers.push(existUser)
    await existUser.save();
    await existVacation.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not follow to this vacation.",
      500
    );
    return next(error);
  }

  res.status(200).json({ existUser });
};

const deleteVacationFromUser = async (req, res, next) => {
  const vacationId = req.params.vid;
  const userId = req.params.uid;
  let existUser = await User.findById(userId);
  const userVacation = existUser.vacations.find((x) => x == vacationId);

  if (!userVacation) {
    const error = new HttpError(
      "Something went wrong, Could not delete this vacation.",
      500
    );
    return next(error);
  }
  try {
    updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { vacations: vacationId } },
      { new: true }
    );
   await Vacation.findByIdAndUpdate(
      vacationId,
      { $pull: { followers: userId } },
      { new: true }
    );
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete to this vacation.",
      500
    );
    return next(error);
  }
  res.status(200).json({ updatedUser });
};

const getVacationsOfUser = async (req, res, next) => {
  const userId = req.params.uid;
  let userVacations;
  let existUser;
  try {
    existUser = await User.findById(userId);
    userVacations = existUser.vacations;
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a vacations.",
      500
    );
    return next(error);
  }
  res.status(200).json({ userVacations });
};

exports.getVacationsOfUser = getVacationsOfUser;
exports.deleteVacationFromUser = deleteVacationFromUser;
exports.addVacationToUser = addVacationToUser;
exports.getVacations = getVacations;
exports.createVacation = createVacation;
exports.updateVacation = updateVacation;
exports.deleteVacation = deleteVacation;
