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

module.exports = router;
