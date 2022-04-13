const express = require("express");
const { check } = require("express-validator");
const usersControllers = require("../controllers/users-controllers");

const vacationControllers = require("../controllers/vacations-controllers");
const checkAuth = require("../middleware/check-auth");
const checkAdmin = require("../middleware/checkAdmin");
const router = express.Router();

router.use(checkAuth);


router.post(
  "/:aid/",
  checkAdmin,
  check("image").not().isEmpty(),
  [
    check("description").not().isEmpty(),
    check("target").not().isEmpty(),
    check("departDate").not().isEmpty(),
    check("returnDate").not().isEmpty(),
    check("price").not().isEmpty(),
  ],
  vacationControllers.createVacation
);

router.patch(
  "/:aid/:vid",
  checkAdmin,
  [
    check("description").not().isEmpty(),
    check("departDate").not().isEmpty(),
    check("returnDate").not().isEmpty(),
    check("price").not().isEmpty(),
  ],
  vacationControllers.updateVacation
);
router.delete("/:aid/:vid", checkAdmin, vacationControllers.deleteVacation);

module.exports = router;
