var { Router } = require("express")
const { check } = require("express-validator");
var phongHocController = require("../controllers/phongHocController")

const router = Router();

router
  .route("/")
  .get(phongHocController.getAll)
  .post(phongHocController.add);
router
  .route("/:id")
  .post(phongHocController.update)
  .get(phongHocController.Delete);
module.exports = router;
