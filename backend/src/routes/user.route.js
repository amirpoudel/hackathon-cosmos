

const {Router} = require("express");
const router = Router()

const user = require("../controllers/user.controller")

router.route("/register").post(user.registerOwnerAndRestaurant);

module.exports = router;
