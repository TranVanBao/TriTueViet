var { Router } = require("express")
var indexC = require("../controllers/AdminC")


const router = Router();
router.route('/:nam')
.get(indexC.get)
.post(indexC.tktheonam)
router.route("/thongke/:nam/:nam1")
.get(indexC.getTK)

router.route("/demsolop/:nam/:nam1")
.get(indexC.getdkkhoahoc)
router.route("/thongkeThu/:nam/:nam1")
.get(indexC.getTKThu)

router.route("/theongay/:ngay")
.get(indexC.theotungngay)


//router.get('*', (req, res) => res.redirect("/"));

//module.exports = router;

module.exports = router;