var { Router } = require("express")
var khoaHocController = require("../../controllers/outsite/khoaHocOutsiteC")


const router = Router();
router.route('/')
.get(khoaHocController.getAll)


router.route('/noidung/:id')
.get(khoaHocController.getnd)


router.route('/noidung')
.get(khoaHocController.getndMD)




//module.exports = router;

module.exports = router;