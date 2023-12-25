const {Router} = require("express");
const menu = require("../controllers/menu.controller");
const router = Router()
const {verifyJWT,verifyRole} = require("../middlewares/auth.middleware");
const { ROLES } = require("../constants");


router.route("/category")
    .post(verifyJWT,verifyRole(ROLES.ADMIN),menu.createMenuCategory)
    .patch(verifyJWT,verifyRole(ROLES.ADMIN),menu.updateMenuCategory)


module.exports = router;