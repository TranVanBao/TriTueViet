var { Router } = require("express")

var taiKhoanController = require("../../controllers/outsite/taiKhoancanhanOutC")
var diendanC = require("../../controllers/outsite/dienDanOutsiteC")
var thoikhoabieu = require("../../controllers/outsite/thoiKhoaBieuOutsiteC")
var lopHocOutC = require("../../controllers/outsite/lopHocOutC")
var upload = require("../../../helpers/uploadfile")

const router = Router();
var single = upload.single("hinhanh");

router.route("/canhan").get(taiKhoanController.getATk);
router.route("/thongtin/:id").post(single, taiKhoanController.updatedtk);
router.route("/doimatkhau/:id").post( taiKhoanController.updatematkhau);

router.route("/diendan/:id")
.get(diendanC.getAll)
.post( taiKhoanController.updatematkhau);

router.route("/diendan/delete/:id")
.get(diendanC.Delete)

router.route("/diendan/update/:id")
.get(diendanC.getA)
.post(diendanC.update)

router.route("/thoikhoabieu/:trangthai")
.get(thoikhoabieu.getAll)
router.route("/lophoc/:trangthai")
.get(lopHocOutC.getAll)


router
  .route("/hocvien/:id")
  .get(lopHocOutC.getAllhocvien)

module.exports = router;
