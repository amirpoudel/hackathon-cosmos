const {Router} = require("express");
const menu = require("../controllers/menu.controller");
const router = Router()
const {verifyJWT,verifyRole} = require("../middlewares/auth.middleware");
const { ROLES } = require("../constants");
const upload = require("../middlewares/multer.middleware");

const itemImageUpload = upload.single("itemImage");


router.route("/category")
    .post(verifyJWT,verifyRole(ROLES.ADMIN),menu.createMenuCategory)
    .patch(verifyJWT,verifyRole(ROLES.ADMIN),menu.updateMenuCategory)
    .get(verifyJWT,verifyRole(ROLES.ADMIN),menu.getMenuCategory);


router.route("/item")
    .post(verifyJWT,verifyRole(ROLES.ADMIN),itemImageUpload,menu.checkMenuCategoryId,menu.createMenuItem)
    .patch(verifyJWT,verifyRole(ROLES.ADMIN),menu.updateMenuItem)
    .delete(verifyJWT,verifyRole(ROLES.ADMIN),menu.deleteMenuItem)
    .get(verifyJWT,verifyRole(ROLES.ADMIN),menu.checkMenuCategoryId,menu.getMenuItem);

router.route("/item/image")
    .patch(verifyJWT,verifyRole(ROLES.ADMIN),itemImageUpload,menu.checkMenuCategoryId,menu.updatedMenuItemImage)
    .delete(verifyJWT,verifyRole(ROLES.ADMIN),menu.deleteMenuItemImage)


router.route("/").get(verifyJWT,verifyRole(ROLES.ADMIN),menu.getMenu);





module.exports = router;