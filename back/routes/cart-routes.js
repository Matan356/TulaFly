const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const cartControllers = require("../controllers/cart-controllers");
const checkAuth = require("../middleware/check-auth");

router.use(checkAuth);

router.get("/:uid", cartControllers.getCartVacations);

router.patch(
  "/:uid/:vid",
  check("userId").not().isEmpty(),
  cartControllers.addVacationToCart
);

router.delete("/:uid/:vid", cartControllers.deleteVacationFromCart);

module.exports = router;
