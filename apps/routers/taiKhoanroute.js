import { Router } from "express";

import taiKhoanController from "../controllers/taiKhoanController";

const router = Router();

router.route("/:quyenhang").get(taiKhoanController.getAllTK);

router.route("/").post(taiKhoanController.addTK);
router
  .route("/:quyenhang/:id")
  .post(taiKhoanController.updatedtk)
  .get(taiKhoanController.DeleteTK);

//router.get("/log", middleware.checkToken);
module.exports = router;
