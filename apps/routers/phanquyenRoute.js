import { Router } from "express";
const { check } = require("express-validator");
import phanquyenController from "../controllers/phanquyenController";

const router = Router();

router
  .route("/")
  .get(phanquyenController.getAll)
  .post(phanquyenController.add);
router
  .route("/:id")
  .post(phanquyenController.update)
  .get(phanquyenController.Delete);
module.exports = router;
