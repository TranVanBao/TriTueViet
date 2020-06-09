var { Router } = require("express")
var thoiKhoaBieuController = require("../controllers/thoiKhoaBieuController")

const router = Router();

router
  .route("/:id")
  .get(thoiKhoaBieuController.getAll) 
  router
  .route("/danghoc/:id")
  .get(thoiKhoaBieuController.getAll) 

router.route('/hanhdong/:id')
.post(thoiKhoaBieuController.update)

module.exports = router;
