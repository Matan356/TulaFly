const express = require("express");
const router = express.Router();

const cartControllers = require("../controllers/cart-controllers");
const checkAuth = require("../middleware/check-auth");

router.use(checkAuth);

router.get("/:uid", cartControllers.getCartVacations);

router.patch(
  "/:uid/:vid",
  cartControllers.addVacationToCart
);

router.delete("/:uid/:vid", cartControllers.deleteVacationFromCart);

router.delete("/:uid", cartControllers.deleteAllVacationsFromCart);

module.exports = router;
