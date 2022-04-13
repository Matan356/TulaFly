const express = require("express");
const { check } = require("express-validator");

const usersControllers = require("../controllers/users-controllers");
const vacationControllers = require("../controllers/vacations-controllers");
const router = express.Router();

router.get("/users", usersControllers.getUsers);

router.get("/", vacationControllers.getVacations); 

router.get("/:uid", vacationControllers.getVacationsOfUser); 


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
