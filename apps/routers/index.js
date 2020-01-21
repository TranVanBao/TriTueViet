import { Router } from "express";
var router = Router();

//====================== router =================================//
router.get("/", function(req, res) {
  res.render("../views/outsite/index.ejs");
});

router.get("/khoahoc", function(req, res) {
  res.render("../views/outsite/khoahoc.ejs");
});
router.get("/contact", function(req, res) {
  res.render("../views/outsite/contact.ejs");
});
router.get("/blog", function(req, res) {
  res.render("../views/outsite/blog.ejs");
});

router.get("/dangky", function(req, res) {
  res.render("../views/outsite/dangky.ejs");
});

router.get("/forum", function(req, res) {
  res.render("../views/outsite/forums.ejs");
});
router.post("/forums", function(req, res) {
  let data = req.body.content
  
  console.log(data);
  
  res.render("../views/outsite/forums.ejs");
});
// when a random route is inputed
//router.get('*', (req, res) => res.render("../views/outsite/index.ejs"));
//===================================== end =================================//
module.exports = router;
