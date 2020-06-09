var { Router } = require("express")

var giangvienController = require("../controllers/giangVienController")

var upload = require("../../helpers/uploadfile")

const router = Router();
var single = upload.single("hinhanh");

router
  .route("/")
  .get(giangvienController.getAll)
  .post(single, giangvienController.add);
router
  .route("/:id")
  .post(single, giangvienController.update)
  .get( giangvienController.Delete)

  router
  .route("/xoa/:id/:hinhanh")
  .post(single, giangvienController.update)
  .get( giangvienController.Delete)

//module.exports = router;

module.exports = router;
