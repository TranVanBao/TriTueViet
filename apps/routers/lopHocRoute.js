import { Router } from "express";
const { check } = require("express-validator");
import lopHocController from "../controllers/lopHocController";

const router = Router();

router
  .route("/")
  .get(lopHocController.getAll)
  .post(lopHocController.add);
router
  .route("/:id")
  .post(lopHocController.update)
  .get(lopHocController.Delete);

  router
  .route("/hocvien/:id")
  .get(lopHocController.getAllhocvien)
module.exports = router;
