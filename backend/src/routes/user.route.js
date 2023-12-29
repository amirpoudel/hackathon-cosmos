

const {Router} = require("express");
const router = Router()
const upload = require("../middlewares/multer.middleware")
const restaurantImage = upload.single("restaurantProfileImage")


const user = require("../controllers/user.controller")

router.route("/register").post(restaurantImage,user.registerOwnerAndRestaurant);
router.route("/login").post(user.loginUser);

module.exports = router;
