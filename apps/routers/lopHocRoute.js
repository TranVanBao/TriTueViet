var { Router } = require("express")

var lopHocController = require("../controllers/lopHocController")

const router = Router();

router
  .route("/")
  .get(lopHocController.getAll)
  .post(lopHocController.add);

  router
  .route("/dem/:trangthai")
  .get(lopHocController.get1lop)
 

  router
  .route("/hocvien/export/:id")
  .get(lopHocController.getExportExl)

router
  .route("/:id")
  .post(lopHocController.update)
  .get(lopHocController.Delete);


  router
  .route("/hocvien/:id")
  .get(lopHocController.getAllhocvien)

module.exports = router;
