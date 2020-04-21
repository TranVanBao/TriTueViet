import { Router } from "express";

import giangvienController from "../controllers/giangVienController";

import upload from "../../helpers/uploadfile";

const router = Router();
var single = upload.single("hinhanh");

router
  .route("/")
  .get(giangvienController.getAll)
  .post(single, giangvienController.add);
router
  .route("/:id")
  .post(single, giangvienController.update)
  .get( giangvienController.Delete)

  router
  .route("/xoa/:id/:hinhanh")
  .post(single, giangvienController.update)
  .get( giangvienController.Delete)

//export default router;

module.exports = router;
