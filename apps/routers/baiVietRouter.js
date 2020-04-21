var  Router  =require("express");
var baiVietController =require("../controllers/baiVietController");
var upload =require("../../helpers/uploadfile");
const router = Router();
var single = upload.single("hinhanh");

router.route("/update/:id").get(baiVietController.getUpdate);
router.route("/them").get(baiVietController.getAdd);
router
  .route("/")
  .get(baiVietController.getAll)
  .post(single, baiVietController.add);

router
  .route("/:id")
  .get(baiVietController.Delete)
  .post(single, baiVietController.update);

module.exports = router;
