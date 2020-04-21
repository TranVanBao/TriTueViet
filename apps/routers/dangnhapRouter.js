import { Router } from "express";

import dangnhapController from "../controllers/dangnhapController";
import { render } from "ejs";

const router = Router();

router.post("/", dangnhapController.getlogin)
//destroy session
router.get('/logout', (req, res) => {
    //destroy session
    req.session.destroy(function(err) {
        res.redirect('/')
    })
})
router.post("/dangky", dangnhapController.addTK)
router.post("/laymatkhau", dangnhapController.laymatkhau)
router
.get("/dangky/xacnhan", dangnhapController.getxacnhan)
.post("/dangky/xacnhan", dangnhapController.xacnhan)

module.exports = router;
