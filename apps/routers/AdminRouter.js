var { Router } = require("express")
var indexC = require("../controllers/AdminC")


const router = Router();
router.route('/:nam')
.get(indexC.get)
.post(indexC.tktheonam)
router.route("/thongke/:nam")
.get(indexC.getTK)

router.route("/demsolop/:nam")
.get(indexC.getdkkhoahoc)
router.route("/thongkeThu/:nam")
.get(indexC.getTKThu)



//router.get('*', (req, res) => res.redirect("/"));

//module.exports = router;

module.exports = router;