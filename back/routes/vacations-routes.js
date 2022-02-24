const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const vacationControllers = require("../controllers/vacations-controllers");

router.get("/", vacationControllers.getVacations);

router.post(
  "/newVacation",
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
  "/:vid",
  [
    check("description").not().isEmpty(),
    check("departDate").not().isEmpty(),
    check("returnDate").not().isEmpty(),
    check("price").not().isEmpty(),
  ],
  vacationControllers.updateVacation
);

router.delete("/:vid", vacationControllers.deleteVacation);

module.exports = router;
