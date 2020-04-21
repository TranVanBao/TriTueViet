var  Router  =require("express");
var baivietController =require("../../controllers/outsite/baivietOutC");

const router = Router();


router.route("/:limit/:chuyenmuc").get(baivietController.getChuyenMuc);
// router
//   .route("/:limit/:chuyenmuc")
//   .get(baivietController.getAll)
router.route("/:limit/:chuyenmuc/:id").get(baivietController.getA);


module.exports = router;
