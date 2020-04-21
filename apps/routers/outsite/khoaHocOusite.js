import { Router } from 'express';
import khoaHocController from '../../controllers/outsite/khoaHocOutsiteC';


const router = Router();
router.route('/')
.get(khoaHocController.getAll)


router.route('/noidung/:id')
.get(khoaHocController.getnd)


router.route('/noidung')
.get(khoaHocController.getndMD)




//export default router;

module.exports = router;