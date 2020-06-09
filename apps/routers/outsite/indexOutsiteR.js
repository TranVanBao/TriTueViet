var { Router } = require("express")
var indexC = require("../../controllers/outsite/indexC")


const router = Router();
router.route('/')
.get(indexC.getAll)


//router.get('*', (req, res) => res.redirect("/"));

//module.exports = router;

module.exports = router;