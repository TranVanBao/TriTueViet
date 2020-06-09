var { Router } = require("express")
var indexC = require("../controllers/AdminC")


const router = Router();
router.route('/')
.get(indexC.get)

router.route('/thongke')
.get(indexC.getTK)

router.route('/thongkeThu')
.get(indexC.getTKThu)

//router.get('*', (req, res) => res.redirect("/"));

//module.exports = router;

module.exports = router;