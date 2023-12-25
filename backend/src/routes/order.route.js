const {Router} = require("express");
const router = Router();

const {verifyJWT,verifyRole} = require("../middlewares/auth.middleware");
const { ROLES } = require("../constants");
const order = require("../controllers/order.controller");




router.route("/:restaurantUsername/:tableNumber")
    .post(order.createOrder)
    
router.route("/")
    .get(verifyJWT,verifyRole(ROLES.ADMIN),order.getOrders)
    .patch(verifyJWT,verifyRole(ROLES.ADMIN),order.updateOrderStatus)

router.route("/payment")
    .patch(verifyJWT,verifyRole(ROLES.ADMIN),order.updateOrderPaymentStatus)

module.exports = router;