var { Router } = require("express")
var diendanController = require("../controllers/dienDanController")

const router = Router();

router
  .route("/")
  .get(diendanController.getAll)  
router
  .route("/:id") 
  .get(diendanController.Delete);
module.exports = router;
