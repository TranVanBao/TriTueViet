var lopHocService = require("../services/lopHocService");
var dangkyService = require("../services/dangkyService");
const lophocService = require("../services/lopHocService");
let d = new Date();
d.getDate();
d.getMonth();
d.getFullYear();
let n = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
class AdminController {
  static async get(req, res) {
    if (
      req.session.user.quyenhang == "Admin" ||
      req.session.user.quyenhang == "Nhân Viên"
    ) {
      try {
        var { nam } = req.params;  
        const data1 = await dangkyService.thongke(nam);
        const tong = await dangkyService.Tongthongke(nam);
        const sinhvien = await dangkyService.getthongKeNgay(n);
        const datathu = await dangkyService.ThongkeThu(nam);
        const tongThu = await dangkyService.TongthongkeThu(nam);
        const demhocvien = await dangkyService.demsosinhvien();
        const demlop = await lophocService.countLop(nam);
        const demsolop = await lophocService.countTungLop(nam);
        var data2 = data1[0];
        const user = req.session.user;
        if (data2.length > 0) {
          res.render("../views/admin/index.ejs", {
            data2,nam,
            demsolop,
            sinhvien,
            user,
            tong,
            datathu,
            tongThu,
            demlop,
            demhocvien,
          });
        } else {
          res.render("../views/admin/index.ejs", {
            data2,nam,
            demsolop,
            sinhvien,
            user,
            tong,
            datathu,
            tongThu,
            demlop,
            demhocvien,
          });
        }
      } catch (error) {
        return error;
      }
    } else {
      return res.redirect("/");
    }
  }
  static async tktheonam(req, res) {
    if (
      req.session.user.quyenhang == "Admin" ||
      req.session.user.quyenhang == "Nhân Viên"
    ) {
      try {
        var nam = req.body.nam;
        res.redirect(`/admin/index/` + nam + ``);
      } catch (error) {
        return error;
      }
    } else {
      return res.redirect("/");
    }
  }
  static async getTK(req, res) {
    if (
      req.session.user.quyenhang == "Admin" ||
      req.session.user.quyenhang == "Nhân Viên"
    ) {
      try {
        var { nam } = req.params;
        const data1 = await dangkyService.thongke(nam);
        const tong = await dangkyService.Tongthongke(nam);
        var data = data1[0];
        if (data.length > 0) {
          res.json({ msg: "success", data, tong });
        } else {
          res.json({ msg: "error" });
        }
      } catch (error) {
        return error;
      }
    } else {
      return res.redirect("/");
    }
  }
  static async getTKThu(req, res) {
    if (
      req.session.user.quyenhang == "Admin" ||
      req.session.user.quyenhang == "Nhân Viên"
    ) {
      try {
        var { nam } = req.params
        const data1 = await dangkyService.ThongkeThu(nam);
        const tong = await dangkyService.TongthongkeThu(nam);
        var data = data1[0];
        if (data.length > 0) {
          res.json({ msg: "success", data, tong });
        } else {
          res.json({ msg: "error" });
        }
      } catch (error) {
        return error;
      }
    } else {
      return res.redirect("/");
    }
  }
  static async getdkkhoahoc(req, res) {
    if (
      req.session.user.quyenhang == "Admin" ||
      req.session.user.quyenhang == "Nhân Viên"
    ) {
      try { 
       
        var  nam  = req.params.nam
        const demlop1 = await lophocService.countLop(nam);
        const demsolop = await lophocService.countTungLop(nam);
        var data = demsolop[0];       
        if (data.length > 0) {
          res.json({ msg: "success", data, demlop1 });
        } else {
          res.json({ msg: "error" });
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
