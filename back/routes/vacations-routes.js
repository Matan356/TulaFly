const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const vacationControllers = require("../controllers/vacations-controllers");

router.get("/", vacationControllers.getVacations); //check

router.post(
  "/",
  check("image").not().isEmpty(),
  [
    check("description").not().isEmpty(),
    check("target").not().isEmpty(),
    check("departDate").not().isEmpty(),
    check("returnDate").not().isEmpty(),
    check("price").not().isEmpty(),
  ],
  vacationControllers.createVacation //check
);

router.patch(
  "/:vid",
  [
    check("description").not().isEmpty(),
    check("departDate").not().isEmpty(),
    check("returnDate").not().isEmpty(),
    check("price").not().isEmpty(),
  ],
  vacationControllers.updateVacation //check
);
router.delete("/:vid", vacationControllers.deleteVacation);  //check

router.get("/:uid", vacationControllers.getVacationsOfUser); //check

router.patch("/:uid/:vid", vacationControllers.addVacationToUser); //check

router.delete("/:uid/:vid", vacationControllers.deleteVacationFromUser);  //check

module.exports = router;
