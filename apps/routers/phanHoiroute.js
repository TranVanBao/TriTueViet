import { Router } from "express";
const { check } = require("express-validator");
import phanHoiController from "../controllers/phanHoiController";

const router = Router();

router
  .route("/")
  .get(phanHoiController.getAll)
  .post(phanHoiController.add);
router
  .route("/phanHoi/:id")
  .post(phanHoiController.update)
  .get(phanHoiController.Delete);
module.exports = router;
