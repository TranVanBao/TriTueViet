import fs from "fs";
import date from "s-date";
import khoaHocService from "../services/khoaHocService";

let d = new Date();
d.getDate();
d.getMonth();
d.getFullYear();
let n = d.getDate() + d.getMonth() + d.getFullYear();

class khoaHocController {
  static async getAll(req, res) {
    if (req.session.user.quyenhang == "Admin" || req.session.user.quyenhang == "Nhân Viên") {
      try {
        const user = req.session.user
        const data = await khoaHocService.getAll();
        if (data.length > 0) {
          res.render("../views/admin/khoahoc/listkhoahoc.ejs", { data, date , user });
        } else {
          res.render("../views/admin/khoahoc/listkhoahoc.ejs", { data, date , user});
        }
        return 0;
      } catch (error) {
        return 0;
      }
    } else {
      return res.redirect("/");
    }
  }

  static async Delete(req, res) {
    if (req.session.user.quyenhang == "Admin" || req.session.user.quyenhang == "Nhân Viên") {
      let { id, hinhanh } = req.params;
      if (!Number(id)) {
        res.redirect("/admin/khoahoc");
      }  
      try {
        if (hinhanh != "images.png") {         
          var url_del = "public/uploadimg/" + hinhanh;         
          if (fs.existsSync(url_del)) {                    
            fs.unlinkSync(url_del);
          }
        }
        let Xoa = await khoaHocService.delete(id);  
        if (Xoa) {          
          res.redirect("/admin/khoahoc?kq=1&mes=Xóa Thành Công!!!");
        } else {
          res.redirect("/admin/khoahoc?kq=0&mes=Xóa Không Thành Công!!!");
        }       
      } catch (error) {
        return error;
      }
    } else {
      return res.redirect("/");
    }
  }

  static async add(req, res) {
    let hinhanh = "images.png";
    if (req.file) {
      hinhanh = n + "-" + req.file.originalname;
    }
    let data = { ...req.body, hinhanh };
    try {
      const created = await khoaHocService.add(data);
      res.redirect("/admin/khoahoc");
    } catch (error) {
      return error;
    }
  }
  static async update(req, res) {
    let id = req.params.id;
    let hinhanh = req.body.hinhanh;
    console.log(hinhanh);
    if (req.file) {
      console.log(req.file);
      hinhanh = n + "-" + req.file.originalname;
    }
    let altered = { ...req.body, hinhanh };
    console.log(altered);
    try {
      const update = await khoaHocService.Update(id, altered);
      if (!update) {
        res.redirect("/admin/khoahoc?kq=0&mes=Lỗi!!!");
      } else {
        res.redirect("/admin/khoahoc?kq=1&mes=Thành Công!!!");
      }
    } catch (error) {
      return error;
    }
  }
}

export default khoaHocController;
