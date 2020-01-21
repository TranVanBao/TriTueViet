import { Router } from 'express';
const { check  } = require('express-validator');
import hocVienController from '../controllers/hocVienController';

const router = Router();


router.route('/')
.get(hocVienController.getAll)
.post( [    
    check("hoten")
    .isLength({ min: 2, max: 50 })
    .withMessage("Min length 5 & Max length 50"),
    check("sdt")   
    .isLength({ min: 9, max: 50 })
    .withMessage("Không phải là số điện thoại đúng!!!"),
  check("diachi")
     .isLength({ min: 2, max: 50 })
    .withMessage("Min length 5 & Max length 50"),
    check("email")
    .isEmail()
    .withMessage("Is not email")   
    .isLength({ min: 5, max: 50 })
    .withMessage("Min length 5 & Max length 50")    
],
hocVienController.add
)
router.route('/:id')
.post(hocVienController.update)
.get(hocVienController.Delete)
//export default router;

module.exports = router;