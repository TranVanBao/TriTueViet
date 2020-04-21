import fs from "fs";
import giangvienService from "../services/giangVienService";

let d = new Date();
d.getDate();
d.getMonth();
d.getFullYear();
let n = d.getDate() + d.getMonth() + d.getFullYear();

class giangvienController {
  static async getAll(req, res) {  
    if (req.session.user.quyenhang == "Admin" || req.session.user.quyenhang == "Nhân Viên") {
      try {
        const user = req.session.user
        const data = await giangvienService.getAll();
        if (data.length > 0) {
          res.render("../views/admin/nhanvien/listnv.ejs", { data ,user });
        } else {
          res.render("../views/admin/nhanvien/listnv.ejs", {
            data, user,
            message: "Khong co du lieu"
          });
        }
      } catch (error) {
        return error;
      }
    } else {
      return res.redirect("/");
    }
  }

  static async Delete(req, res) {   
    if (req.session.user.quyenhang == "Admin" || req.session.user.quyenhang == "Nhân Viên") {
      let { id, hinhanh } = req.params;
      if (!Number(id)) {
        res.redirect("/admin/giangvien");
      }

      try {
        if (hinhanh != "ImagesDefault.png") {
          // var url_del = "../../public/uploadimg/" + hinhanh;
          var url_del = "public/uploadimg/" + hinhanh;
          console.log(url_del);
          if (fs.existsSync(url_del)) {
            fs.unlinkSync(url_del);
          }
        }
        let Xoa = await giangvienService.delete(id);
        if (Xoa) {
          res.redirect("/admin/giangvien");
        } else {
          res.redirect("/admin/giangvien");
        }
        res.redirect("/admin/giangvien");
      } catch (error) {
        return error;
      }
    } else {
      return res.redirect("/");
    }
  }

  static async add(req, res) {
    let hinhanh = "ImagesDefault.png";
    if (req.file) {
      hinhanh = n + "-" + req.file.originalname;
    }
    let data = { ...req.body, hinhanh };
    try {
      const created = await giangvienService.add(data);
      res.status(204).redirect("/admin/giangvien");
    } catch (error) {
      return error;
    }
  }

  static async update(req, res) {
    let id = req.params.id
    let hinhanh = req.body.hinhanh;    
    if (req.file) {    
      hinhanh = n + "-" + req.file.originalname;
    }
      
  let  altered = { ...req.body, hinhanh };
    console.log(altered);    
    try {
      const update = await giangvienService.Update(id, altered);
      if (!update) {
        res.redirect("/admin/giangvien?kq=0");
      } else {
        res.redirect("/admin/giangvien?kq=1");
      }
      return res.redirect("/admin/giangvien");
    } catch (error) {
      return res.redirect("/admin/giangvien");
    }
  }
}

export default giangvienController;
