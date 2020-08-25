var date = require("s-date")
var fetch = require("node-fetch")
var stringify = require("node-fetch")
var mail = require("../../../helpers/nodemailer")
var dangkyService = require("../../services/dangkyService")
var lopHocService = require("../../services/lopHocService")
var baivietService = require("../../services/baivietService")

let d = new Date();
d.getDate();
d.getMonth();
d.getFullYear();
let n =  d.getFullYear()+'-'+(d.getMonth()+1)+'-'+(d.getDate()+1);

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
    let ngaydangky = n; 
    let trangthai = 1;    
    let sdt =  Number(req.body.sdt)
    let id_lophoc =  Number(req.body.id_lophoc)
    let { tenkhachhang,  email, diachi} =  {...req.body}    
    let data = await { tenkhachhang, sdt, diachi, email,id_lophoc, thanhtoan,trangthai,ngaydangky }; 
      //  gui mail cho hoc vien dang ky
      const lophoc = await lopHocService.getByID(id_lophoc); 
      const html = `Xin chào `+tenkhachhang+`,
      <br/>
      Trung tâm nhận được thông tin bạn đăng kí lớp:   <b>`+lophoc[0].tenlophoc+`</b> <br/>
      Thời gian học: <b> `+lophoc[0].thoigianhoc+` </b><br/>
      Phí dịch vụ:   <b>`+lophoc[0].phidichvu+`</b> <br/>
      Thời lượng học:   <b>`+lophoc[0].thoiluonghoc+`</b> <br/>
      Ngày bắt đầu học:   <b>`+date('{dd}/{mm}/{yyyy}', lophoc[0].thoigianbatdau)+`</b> <br/>
      Địa điểm học: 38 Nguyễn Lâm, phường 6, quận 10, tp HCM  <br/>
      <p class="MsoNormal" style="margin:0in 0in 8pt;line-height:13.91px"><font face="tahoma, sans-serif" size="4" color="#ff0000">*** Vì đây là khóa học ngắn hạn nên trung tâm không chấp nhận hoàn trả học phí vì bất kì lý do gì, mong bạn suy nghĩ kĩ trước khi đăng kí.</font></p>
      <br/>
      <p class="MsoNormal" style="margin:0in 0in 8pt;color:rgb(80,0,80);line-height:13.91px"><font face="tahoma, sans-serif" size="4" color="#ff0000">Chú ý:</font><font face="tahoma, sans-serif" size="4" color="#000000">&nbsp;Mỗi lớp trung tâm chỉ nhận số lượng học viên nhất định vì vậy sẽ ưu tiên các bạn đăng kí và hoàn tất thủ tục sớm, nếu đủ số lượng các bạn chưa hoàn tất thủ tục trung tâm sẽ thông báo các bạn mất vị trí đăng kí khóa học. Vì vậy mong các bạn đăng và hoàn tất thủ tục càng sớm càng tốt.</font></p> <br/>
      Cám ơn bạn đã quan tâm các khóa học tại trung tâm <b>Trí Tuệ Việt</b> <br/>
    Thanks & Best Regards!  <br/>
    <font size="4" face="georgia, serif" color="#000000"><b>Trung Tâm Đào Tạo Tin Học Trí Tuệ Việt</b></font>  <br/>
    <font size="4" color="#000000" face="arial narrow, sans-serif"><b>38 Nguyễn Lâm, phường 6, quận 10, tp HCM</b></font> <br/>
    Website: <a href="http://localhost:3000/">http://localhost:3000/</a><br/>
    Email:tranvanbaocntt1@gmail.com            
      <br/><br/>
      Chúc bạn một ngày tốt lành.` 
      await mail(email,tenkhachhang, html); 

  // ket thuc phan gui mai
      const created = await dangkyService.add(data);      
      if (created == null ) {
       // res.redirect("/register?kq=0&mes=Đăng ký thất bại !!!");
         res.json({ success: false, msg: 'Bạn đã đăng ký khóa học này !!' });
      } else {        
       // res.redirect("/register?kq=1&mes=Đăng ký thành công !!!");
         res.json({ success: true, msg: 'Đăng ký thành công !!' });
      }
    } catch (error) {
      return error;
    }
  }

  // static async update(req, res) {
  //   let thanhtoan = req.body.thanhtoan;
  //   if (thanhtoan == "") {
  //     thanhtoan = 0;
  //   }
  //   let altered = await { ...req.body, thanhtoan };
  //   const { id } = req.params;
  //   try {
  //     const update = await dangkyService.Update(id, altered);
  //     if (!update) {
  //       res.redirect("/admin/dangky");
  //     } else {
  //       res.redirect("/admin/dangky");
  //     }
  //     res.redirect("/admin/dangky");
  //   } catch (error) {
  //     return error;
  //   }
  // }

  
}

module.exports = dangkyController;
