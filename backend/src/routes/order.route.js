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

//router.route("/payment")
  //  .patch(verifyJWT,verifyRole(ROLES.ADMIN),order.updateOrderPaymentStatus)

router.route("/dayAmount")
    .get(verifyJWT,verifyRole(ROLES.ADMIN),order.getDayTotalOrderAmount)

router.route("/stats").get(verifyJWT,verifyRole(ROLES.ADMIN),order.getOrderStats)
router.route("/totalSales").get(verifyJWT,verifyRole(ROLES.ADMIN),order.getTotalOrderAmountPerItem)


router.route("/track/:phoneNumber").get(order.trackOrder)

module.exports = router;