

const {Router} = require("express");
const router = Router()
const upload = require("../middlewares/multer.middleware")
const restaurantImage = upload.single("restaurantProfileImage")


const user = require("../controllers/user.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");

router.route("/validate-token").post(verifyJWT,user.validateToken)

router.route("/register").post(restaurantImage,user.registerOwnerAndRestaurant);
router.route("/login").post(user.loginUser);

module.exports = router;
