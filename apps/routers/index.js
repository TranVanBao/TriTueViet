import { Router } from "express";
import multer from "multer"
import crypto from "crypto"
import path from "path"
import baivietService from "../services/baivietService"
const Promise = require('bluebird');

const fs = Promise.promisifyAll(require('fs'));

var router = Router();

//====================== router =================================//

router.get("/contact", async function(req, res) {
  let user = []
  if(req.session.user){
    user = req.session.user
  }    
  const baiviet = await baivietService.getNew();
  res.render("../views/outsite/contact.ejs", {user ,baiviet});
});


// =========================forums============================

//  add hinh ckeditor
var storage = multer.diskStorage({
  //folder upload -> public/upload
  destination: 'public/uploadimg/ck/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)
      cb(null, Math.floor(Math.random()*9000000000) + 1000000000 + path.extname(file.originalname))
    })
  }
})
var upload = multer({ storage: storage });


//show all image in folder upload to json
router.get('/files', function (req, res) {
  const images = fs.readdirSync('public/uploadimg/ck/')
  
  var sorted = []
  for (let item of images){
      if(item.split('.').pop() === 'png'
      || item.split('.').pop() === 'jpg'
      || item.split('.').pop() === 'jpeg'
      || item.split('.').pop() === 'svg'){
          var abc = {
                "image" : "/uploadimg/ck/"+item,
                "folder" : '/'
          }
          sorted.push(abc)
      }
  }
  res.send(sorted);
})
//upload image to folder upload
router.post('/upload', upload.array('flFileUpload', 12), function (req, res, next) {
    res.redirect('back')
});

// when a random route is inputed
//router.get('*', (req, res) => res.render("../views/outsite/index.ejs"));
//===================================== end =================================//
module.exports = router;
