import { Router } from "express";
import forumController from "../../controllers/outsite/forumController";
const router = Router();


router
  .route("/baiviet/:limit")
  .get(forumController.getAll)
  
//   router
//   .route("/chi-tiet")
//   .get(forumController.getAll)
  
router
  .route("/chi-tiet/:id")
  .get(forumController.getChiTiet) 
  .post(forumController.addcoment)
 
 
router
.route("/hoi-bai")
.get(forumController.getHoiBai)
.post(forumController.add)



router
.route("/khoahoc/:id/:tenkhoahoc/:limit")
.get(forumController.gettheokhoahoc)

  
  
  
module.exports = router;
