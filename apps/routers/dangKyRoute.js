var { Router } = require("express")

var dangKyController = require("../controllers/dangKyController")

const router = Router();

router
  .route("/")
  .get(dangKyController.getAll)
  .post(dangKyController.add);
router.route("/:id").post(dangKyController.update);
router.route("/xoadangky/:id").get(dangKyController.Delete);
//module.exports = router;

module.exports = router;
