const {Router} = require("express");
const restaurant = require("../controllers/restaurant.controller");
const router = Router();


//public routes
router.get("/",restaurant.getRestaurant)

module.exports = router;