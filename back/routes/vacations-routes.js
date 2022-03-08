const express = require("express");
const router = express.Router();

const vacationControllers = require("../controllers/vacations-controllers");
const checkAuth = require("../middleware/check-auth");


router.get("/", vacationControllers.getVacations); 

router.use(checkAuth);

router.get("/:uid", vacationControllers.getVacationsOfUser); 

router.patch("/:uid/:vid", vacationControllers.addVacationToUser); 

router.delete("/:uid/:vid", vacationControllers.deleteVacationFromUser);  

module.exports = router;
