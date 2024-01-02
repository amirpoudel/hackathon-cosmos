const Router = require("express");
const router = Router();
const task = require("../controllers/task.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");

router.route("/").post(verifyJWT,task.createTaskHandler).get(verifyJWT,task.getTaskHandler);

router.route("/:taskId")
      .patch(verifyJWT,task.updateTaskStatusHandler)
      .delete(verifyJWT,task.deleteTaskHandler)


module.exports = router;