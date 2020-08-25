var dates = require("s-date")


var dangkyService = require("../services/dangkyService");
const lophocService = require("../services/lopHocService");
let d = new Date();
d.getDate();
d.getMonth();
d.getFullYear();
let n = d.getFullYear() + "-0" + (d.getMonth() + 1) + "-" + d.getDate();

class AdminController {
  static async get(req, res) {
    if (
      req.session.user.quyenhang == "Admin" ||
      req.session.user.quyenhang == "Nhân Viên"
    ) {
      try {
        let ngaymoinhat ; 
        if(req.body.tg1){
           ngaymoinhat = req.body.tg1
        }else{
          ngaymoinhat = n
        }
       
        var { nam } = req.params;  
        const data1 = await dangkyService.thongke(nam,'2020-12-31');
        const tong = await dangkyService.Tongthongke(nam,'2020-12-31');
       // const sinhvien = await dangkyService.getthongKeNgay(ngaymoinhat);
        const datathu = await dangkyService.ThongkeThu(nam,'2020-12-31');
        const tongThu = await dangkyService.TongthongkeThu(nam,'2020-12-31');
        const demhocvien = await dangkyService.demsosinhvien();
        const demlop = await lophocService.countLop(nam,'2020-12-31');
        const demsolop = await lophocService.countTungLop(nam,'2020-12-31');
        const thongbao = await lophocService.getAll(1);
        let mang = [];
        
        var d1 = Date.parse(n);  
        thongbao[0].forEach(dl => {       
          let d = dates('{yyyy}-{mm}-{dd}', dl.thoigianbatdau)   ; 
          var d2 = Date.parse(d);   
          if(d2 == d1){ 
           mang.push(dl.tenlophoc) 
          }
         });
         
        var data2 = data1[0];
        const user = req.session.user;
        if (user.length > 0) {
          res.render("../views/admin/index.ejs", {
            data2,nam, mang,
            dates,
            demsolop,
            //sinhvien,
            user,
            tong,
            datathu,
           tongThu,
            demlop,
            demhocvien,
          });
        } else {
          res.render("../views/admin/index.ejs", {
            data2,nam,mang,
            dates,
            demsolop,
        //    sinhvien,
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
        var { nam , nam1 } = req.params;
        const data1 = await dangkyService.thongke(nam1,nam);
        const tong = await dangkyService.Tongthongke(nam1,nam);
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
        var { nam,nam1 } = req.params;
        const data1 = await dangkyService.ThongkeThu(nam,nam1);
        const tong = await dangkyService.TongthongkeThu(nam,nam1);
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
       
        var  {nam , nam1} = req.params
        const demlop1 = await lophocService.countLop(nam,nam1);
        const demsolop = await lophocService.countTungLop(nam,nam1);
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
// thong ke theo ngay == done
static async theotungngay(req, res) {
  if (
    req.session.user.quyenhang == "Admin" ||
    req.session.user.quyenhang == "Nhân Viên"
  ) {
    try {
      var ngay = req.params.ngay;
      const sinhvien = await dangkyService.getthongKeNgay(ngay); 
      if (sinhvien.length > 0) {
        res.json({ msg: "success",  sinhvien });
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
