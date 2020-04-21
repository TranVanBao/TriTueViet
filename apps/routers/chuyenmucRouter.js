var  Router  =require("express");
var chuyenmucController =require("../controllers/chuyenmucController");

const router = Router();

router
  .route("/")
  .get(chuyenmucController.getAll)
  .post(chuyenmucController.add);
router
  .route("/:id")  
  .post(chuyenmucController.update);
module.exports = router;
