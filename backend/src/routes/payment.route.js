
const {Router} = require("express");
const router = Router();
const payment = require("../controllers/payment.controller");
const restaurant = require("../controllers/restaurant.controller");

router.route("/:restaurantUsername").post(restaurant.checkRestaurantUsername,payment.initiatePaymentHandler)


module.exports = router;