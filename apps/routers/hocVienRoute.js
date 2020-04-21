import { Router } from 'express';

import hocVienController from '../controllers/hocVienController';

const router = Router();


router.route('/')
.get(hocVienController.getAll)
.post( hocVienController.add)
router.route('/:id')
.post(hocVienController.update)
.get(hocVienController.Delete)
//export default router;

module.exports = router;