import { Router } from "express";

import taiKhoanController from "../controllers/taiKhoanController";

const router = Router();

router.route("/:quyenhang").get(taiKhoanController.getAllTK);

router.route("/").post(taiKhoanController.addTK);
router
  .route("/:id")
  .post(taiKhoanController.updatedtk)
  .get(taiKhoanController.DeleteTK);

//router.route("/login").post(taiKhoanController.getlogin);
//router.get("/log", middleware.checkToken);
module.exports = router;
