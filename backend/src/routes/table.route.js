const {Router} = require("express");
const router = Router();
const {verifyJWT,verifyRole} = require("../middlewares/auth.middleware");
const { ROLES } = require("../constants");
const table = require("../controllers/table.controller");



router.route("/")
    .post(verifyJWT,verifyRole(ROLES.ADMIN),table.createTable)
    .patch(verifyJWT,verifyRole(ROLES.ADMIN),table.updateTable)
    .delete(verifyJWT,verifyRole(ROLES.ADMIN),table.deleteTable)
    .get(verifyJWT,verifyRole(ROLES.ADMIN),table.getTable);

    

module.exports = router;