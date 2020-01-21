import { Router } from "express";

import dangKyController from "../controllers/dangKyController";

const router = Router();

router
  .route("/")
  .get(dangKyController.getAll)
  .post(dangKyController.add);
router.route("/:id").post(dangKyController.update);
router.route("/xoadangky/:id").get(dangKyController.Delete);
//export default router;

module.exports = router;
