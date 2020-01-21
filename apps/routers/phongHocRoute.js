import { Router } from "express";
const { check } = require("express-validator");
import phongHocController from "../controllers/phongHocController";

const router = Router();

router
  .route("/")
  .get(phongHocController.getAll)
  .post(phongHocController.add);
router
  .route("/:id")
  .post(phongHocController.update)
  .get(phongHocController.Delete);
module.exports = router;
