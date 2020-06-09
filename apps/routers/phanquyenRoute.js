var { Router } = require("express")
const { check } = require("express-validator");
var phanquyenController = require("../controllers/phanquyenController")

const router = Router();

router
  .route("/")
  .get(phanquyenController.getAll)
  .post(phanquyenController.add);
router
  .route("/:id")
  .post(phanquyenController.update)
  .get(phanquyenController.Delete);
module.exports = router;
