const { json } = require("body-parser");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Vacation = require("../models/vacation");

const createVacation = async (req, res, next) => {
  console.log(req.body);

  const errors = validationResult(req);
  console.log(errors);
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
    console.log(req.body);
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
    console.log(existVacations);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a vacation.",
      500
    );
    return next(error);
  }
  res.status(201).json({ vacation: existVacations });
};

const updateVacation = async (req, res, next) => {
  const errors = validationResult(req);
  console.log("errors:" + JSON.stringify(errors));
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { description, departDate, returnDate, price } = req.body;
  const vacationId = req.params.vid;
  let vacation;
  try {
    console.log("req.body:" + JSON.stringify(req.body));
    vacation = await Vacation.findById(vacationId);
    console.log("vacation:" + vacation);
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
  console.log("vacation:" + vacation);

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
  console.log("vacationId:" + vacationId);

  let vacation;
  try {
    vacation = await Vacation.findById(vacationId);
    console.log("vacation:" + vacation);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete vacation.",
      500
    );
    return next(error);
  }

  if (!vacation) {
    const error = new HttpError("Could not find vacation for this id.", 404);
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
exports.getVacations = getVacations;
exports.createVacation = createVacation;
exports.updateVacation = updateVacation;
exports.deleteVacation = deleteVacation;
