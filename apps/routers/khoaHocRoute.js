var { Router } = require("express");
var khoaHocController = require("../controllers/khoaHocController");

var upload = require("../../helpers/uploadfile");

const router = Router();
var single = upload.single("hinhanh");

router.route("/update/:id").get(khoaHocController.getupdate);
router.route("/").get(khoaHocController.getAll);
router.route("/add").get(khoaHocController.getadd);

router.route("/").post(single, khoaHocController.add);
router.route("/:id").post(single, khoaHocController.update);
router.route("/delete/:id/:hinhanh").get(khoaHocController.Delete);

//module.exports = router;

module.exports = router;
