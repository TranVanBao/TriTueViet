var { Router } = require("express")

var taiKhoanController = require("../controllers/taiKhoancanhanController")
var upload = require("../../helpers/uploadfile")

const router = Router();
var single = upload.single("hinhanh");

router.route("/").get(taiKhoanController.getATk);
router.route("/thongtin/:id").post(single, taiKhoanController.updatedtk);
router.route("/doimatkhau/:id").post( taiKhoanController.updatematkhau);

module.exports = router;
