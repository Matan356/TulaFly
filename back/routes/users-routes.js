const express = require("express");
const { check } = require("express-validator");

const usersControllers = require("../controllers/users-controllers");
const vacationControllers = require("../controllers/vacations-controllers");
const router = express.Router();

router.get("/", vacationControllers.getVacations); 

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("lastName").not().isEmpty(),
    check("userName").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersControllers.signup
);

router.post("/login", usersControllers.login);

module.exports = router;
