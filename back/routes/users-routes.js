const express = require("express");
const { check } = require("express-validator");

const usersControllers = require("../controllers/users-controllers");

const router = express.Router();

router.get("/", usersControllers.getUsers); //check

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("lastName").not().isEmpty(),
    check("userName").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersControllers.signup //check
);
router.post("/login", usersControllers.login); //check

module.exports = router;
