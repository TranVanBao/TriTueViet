import { Router } from "express";
import dangKyController from "../../controllers/outsite/dangKyOutsiteC";

const router = Router();

router
  .route("/register")
  .get(dangKyController.getAll)
  .post(dangKyController.add);

  
 
// =================== dang ky outsite ============== captcha==============

// router.post('/subscribe', async (req, res) => {
  
//   if (!req.body.captcha)
//    { return res.json({ success: false, msg: 'Please select captcha' }) }
//   // Secret key
//   const secretKey = '6LfWmNgUAAAAAByejHVatp1JvpJtRNccgNjzGeSx';
//   const verifyURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body.captcha + "&remoteip=" + req.connection.remoteAddress;
//   // Make a request to verifyURL
//   const body = await fetch(verifyURL).then(res => res.json());  
//   // If not successful
//   if (body.success !== undefined && !body.success)
//     return res.json({ success: false, msg: 'Failed captcha verification' });
//   // If successful
//   return res.json({ success: true, msg: 'Xác thực thành công !!' });
  


// }); 

module.exports = router;
