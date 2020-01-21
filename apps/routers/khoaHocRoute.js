import { Router } from 'express';
import { check  } from 'express-validator';
import khoaHocController from '../controllers/khoaHocController';

import upload from '../../helpers/uploadfile'

const router = Router();
var single = upload.single("hinhanh");

router.route('/')
.get(khoaHocController.getAll)

router.route('/')
.post( single,khoaHocController.add)
router.route('/:id')
.post(single,khoaHocController.update)
router.route('/delete/:id/:hinhanh')
.get(khoaHocController.Delete) 

//export default router;

module.exports = router;