import { Router } from 'express';
const { check  } = require('express-validator');
import thoiKhoaBieuController from '../controllers/thoiKhoaBieuController';

const router = Router();


router.route('/thoiKhoaBieu')
.get(thoiKhoaBieuController.getAll)
.post( 
thoiKhoaBieuController.add
)
router.route('/thoiKhoaBieu/:id')
.post(thoiKhoaBieuController.update)
.get(thoiKhoaBieuController.Delete)
module.exports = router;