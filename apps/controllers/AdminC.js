var lopHocService = require("../services/lopHocService")
var dangkyService = require("../services/dangkyService")
class AdminController {
  static async get(req, res) {
    if (req.session.user.quyenhang == "Admin" || req.session.user.quyenhang == "Nhân Viên" ) {
      try {
    
        const data1 = await dangkyService.thongke();
        var data2 = data1[0];
        const user = req.session.user
        if (data2.length > 0) {
          res.render("../views/admin/index.ejs", {
            data2 , user
          });
        } else {
          res.render("../views/admin/index.ejs", {
            data2 ,user
          });
        }
      
      } catch (error) {
        return error;
      }
    } else {
      return res.redirect("/");
    }
  }
  static async getTK(req, res) {
    if (req.session.user.quyenhang == "Admin" || req.session.user.quyenhang == "Nhân Viên") {
      try {
        
        const data1 = await dangkyService.thongke();
        const tong = await dangkyService.Tongthongke()       
        var data = data1[0];     
        if (data.length > 0) {
           res.json({ msg: "success", data ,tong });
        } else {
          res.json({msg:'error'});
        }
       
      } catch (error) {
        return error;
      }
    } else {
      return res.redirect("/");
    }
  }
  static async getTKThu(req, res) {
    if (req.session.user.quyenhang == "Admin" || req.session.user.quyenhang == "Nhân Viên") {
      try {
        const data1 = await dangkyService.ThongkeThu();
        const tong = await dangkyService.TongthongkeThu()       
        var data = data1[0];      
        if (data.length > 0) {
          res.json({ msg: "success", data ,tong });
        } else {
          res.json({msg:'error'});
        }
       
      } catch (error) {
        return error;
      }
    } else {
      return res.redirect("/");
    }
  }
}
module.exports = AdminController;
