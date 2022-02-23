const { validationResult } = require("express-validator");
// const mongoose = require("mongoose");

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

  const { description, target, departDate, returnDate, price,image } = req.body;

  const createdVacation = new Vacation({
    description,
    target,
    departDate,
    returnDate,
    price,
    image
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
        'Something went wrong, could not find a vacation.',
        500
      );
      return next(error);
    } 
    res.status(201).json({ vacation: existVacations});

  
    // if (!place) {
    //   const error = new HttpError(
    //     'Could not find place for the provided id.',
    //     404
    //   );
    //   return next(error);
    // }
}
exports.getVacations = getVacations;
// exports.getVacationsByUserId = getVacationsByUserId;
exports.createVacation = createVacation;
// exports.updateVacation = updateVacation;
// exports.deleteVacation = deleteVacation;
