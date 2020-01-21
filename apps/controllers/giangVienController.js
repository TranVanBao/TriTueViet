import fs from "fs";
import multer from "multer";
import giangvienService from "../services/giangVienService";

let d = new Date();
d.getDate();
d.getMonth();
d.getFullYear();
let n = d.getDate() + d.getMonth() + d.getFullYear();

class giangvienController {
  static async getAll(req, res) {
    console.log(req.session.user);
    if (req.session.user) {
      try {
        const data = await giangvienService.getAll();
        if (data.length > 0) {
          res.render("../views/admin/nhanvien/listnv.ejs", { data: data });
        } else {
          res.render("../views/admin/nhanvien/listnv.ejs", {
            data: data,
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
    console.log(req.session.user);
    if (req.session.user) { 
      let { id, hinhanh } = req.params;
      if (!Number(id)) {
        res.status(404).redirect("/admin/giangvien");
      }
      try {
        if (hinhanh != "ImagesDefault.png") {
          let xoahinh = await fs.unlink(
            "../../public/uploadimg/" + hinhanh,
            err => {
              if (err) return err;
            }
          );
          if (!xoahinh) {
            console.log("Xoa hinh khong thanh cong !!!!");
          }
        }

        let Xoa = await giangvienService.delete(id);
        if (Xoa) {
          res.status(204).redirect("/admin/giangvien");
        } else {
          res.status(404).redirect("/admin/giangvien");
        }
        res.status(404).redirect("/admin/giangvien");
      } catch (error) {
        return error;
      }
    } else {
      return res.redirect("/");
    }
  }

  static async add(req, res) {
    let hinhanh = n + "-" + "ImagesDefault.png";
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
    console.log(req.file);
    let altered = { ...req.body };
    // if (req.file) {
    //   let hinhanh = req.file.originalname;
    //   altered = { ...req.body, hinhanh };
    // }
    // let altered = { ...req.body };
    const { id } = req.params;
    if (!Number(id)) {
      res.status(404).redirect("/admin/giangvien");
      return res.status(404).redirect("/admin/giangvien");
    }
    try {
      const update = await giangvienService.Update(id, altered);
      if (!update) {
        res.status(404).redirect("/admin/giangvien");
      } else {
        res.status(404).redirect("/admin/giangvien");
      }
      return res.status(404).redirect("/admin/giangvien");
    } catch (error) {
      res.status(404).redirect("/admin/giangvien");
      return util.send(res);
    }
  }


}

export default giangvienController;
