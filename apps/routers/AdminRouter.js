import { Router } from 'express';
import indexC from '../controllers/AdminC';


const router = Router();
router.route('/')
.get(indexC.get)

router.route('/thongke')
.get(indexC.getTK)

router.route('/thongkeThu')
.get(indexC.getTKThu)

//router.get('*', (req, res) => res.redirect("/"));

//export default router;

module.exports = router;