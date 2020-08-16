var { Router } = require("express")
var indexC = require("../controllers/AdminC")


const router = Router();
router.route('/:nam')
.get(indexC.get)

router.route("/thongke/:nam")
.get(indexC.getTK)

router.route("/thongkeThu/:nam")
.get(indexC.getTKThu)

//router.get('*', (req, res) => res.redirect("/"));

//module.exports = router;

module.exports = router;