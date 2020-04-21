import { Router } from 'express';
import indexC from '../../controllers/outsite/indexC';


const router = Router();
router.route('/')
.get(indexC.getAll)


//router.get('*', (req, res) => res.redirect("/"));

//export default router;

module.exports = router;