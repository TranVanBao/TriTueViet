var { Router } = require("express")

var thutienController = require("../controllers/thutienController")

const router = Router();

router
  .route("/")
  .get(thutienController.getAll)
 
router.route("/:id").post(thutienController.update);

//module.exports = router;

module.exports = router;
