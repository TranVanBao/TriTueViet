var date = require("s-date")
var fetch = require("node-fetch")
var stringify = require("node-fetch")

var dangkyService = require("../../services/dangkyService")
var lopHocService = require("../../services/lopHocService")
var baivietService = require("../../services/baivietService")

class dangkyController {
  static async getAll(req, res) {   
    try {     
      let user = []
      if(req.session.user){
        user = req.session.user
      }     
      const lophoc = await lopHocService.getsapmo();
      const baiviet = await baivietService.getNew();
      if (lophoc.length > 0) {
        res.render("../views/outsite/dangky.ejs", {        
          lophoc, user,baiviet,
          date,
          message: 1
        });
      } else {
        res.render("../views/outsite/dangky.ejs", {         
          lophoc, user,baiviet,
          date,
          message: 0
        });
      }
    } catch (error) {
      return error;
    }
  
  }

  static async Delete(req, res) {   
    if(req.session.user){
    let { id } = req.params;
    if (!Number(id)) {
      res.redirect("/admin/dangky");
      return; //util.send(res);
    }
    try {
      let Xoa = await dangkyService.delete(id);
      if (Xoa) {
        res.redirect("/admin/dangky");
      } else {
        res.redirect("/admin/dangky");
      }
      return;
    } catch (error) {
      return error;
    }
  }else{ return res.redirect('/') }
  }

  static async add(req, res) {      
    try {
      // =captcha==============      
    if (!req.body.captcha)
    { return res.json({ success: false, msg: 'Please select captcha' }) }
   // Secret key
   const secretKey = '6LfWmNgUAAAAAByejHVatp1JvpJtRNccgNjzGeSx';
   const verifyURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body.captcha + "&remoteip=" + req.connection.remoteAddress;
   // Make a request to verifyURL
   const body = await fetch(verifyURL).then(res => res.json());  
   // If not successful
   if (body.success !== undefined && !body.success)
     return res.json({ success: false, msg: 'Failed captcha verification' });
   // If successful   
    // ============end captcha=================    
    let thanhtoan = 0;     
    let trangthai = 1;    
    let sdt =  Number(req.body.sdt)
    let id_lophoc =  Number(req.body.id_lophoc)
    let { tenkhachhang,  email, diachi} =  {...req.body}    
    let data = await { tenkhachhang, sdt, diachi, email,id_lophoc, thanhtoan,trangthai }; 
    console.log(data);
      const created = await dangkyService.add(data);      console.log(created);
      if (created == null ) {
       // res.redirect("/register?kq=0&mes=Đăng ký thất bại !!!");
         res.json({ success: false, msg: 'Đăng ký không thành công !!' });
      } else {        
       // res.redirect("/register?kq=1&mes=Đăng ký thành công !!!");
         res.json({ success: true, msg: 'Đăng ký thành công !!' });
      }
    } catch (error) {
      return error;
    }
  }

  static async update(req, res) {
    let thanhtoan = req.body.thanhtoan;
    if (thanhtoan == "") {
      thanhtoan = 0;
    }
    let altered = await { ...req.body, thanhtoan };
    const { id } = req.params;
    try {
      const update = await dangkyService.Update(id, altered);
      if (!update) {
        res.redirect("/admin/dangky");
      } else {
        res.redirect("/admin/dangky");
      }
      res.redirect("/admin/dangky");
    } catch (error) {
      return error;
    }
  }

  
}

module.exports = dangkyController;
