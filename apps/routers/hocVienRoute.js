var { Router } = require("express")

var hocVienController = require("../controllers/hocVienController")

const router = Router();


router.route('/')
.get(hocVienController.getAll)
.post( hocVienController.add)
router.route('/:id')
.post(hocVienController.update)
.get(hocVienController.Delete)
//module.exports = router;

module.exports = router;