var dates = require("s-date")
var mail = require("../../helpers/nodemailer")
var dangkyService = require("../services/dangkyService")
var lopHocService = require("../services/lopHocService")
let d = new Date();
d.getDate();
d.getMonth();
d.getFullYear();
let n =  d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();

class dangkyController {
  static async getAll(req, res) {     
    if(req.session.user.quyenhang == "Admin" || req.session.user.quyenhang == "Nhân Viên"){
    try {
      const user = req.session.user
      const data1 = await dangkyService.thutien();
      var data = data1[0];    
    
      if (data.length > 0) {
        res.render("../views/admin/thutien/listthutien.ejs", {
          data, user,          
          dates,
          message: 1
        });
      } else {
        res.render("../views/admin/thutien/listthutien.ejs", {
          data, user,          
          dates,
          message: 0
        });
      }
    } catch (error) {
      return error;
    }
  }else{ return res.redirect('/') }
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
        res.redirect("/admin/thutien?kq=0&mes=Lỗi!");
      } else {
        res.redirect("/admin/thutien?kq=1&mes=Thành Công!");
      }
      res.redirect("/admin/thutien");
    } catch (error) {
      return error;
    }
  }
 
 
  
}

module.exports = dangkyController;
