const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const vacationControllers = require("../controllers/vacations-controllers");

router.get("/", vacationControllers.getVacations); 

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

router.get("/:uid", vacationControllers.getVacationsOfUser); 

router.patch("/:uid/:vid", vacationControllers.addVacationToUser); 

router.delete("/:uid/:vid", vacationControllers.deleteVacationFromUser);  

module.exports = router;
