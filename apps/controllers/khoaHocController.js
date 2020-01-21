import { validationResult } from "express-validator";
import multer from "multer";
import date from "s-date";
import khoaHocService from "../services/khoaHocService";

let d = new Date();
d.getDate();
d.getMonth();
d.getFullYear();
let n = d.getDate() + d.getMonth() + d.getFullYear();

class khoaHocController {
  static async getAll(req, res) {
    if (req.session.user) {
      try {
        const data = await khoaHocService.getAll();
        if (data.length > 0) {
          res.render("../views/admin/khoahoc/listkhoahoc.ejs", { data, date });
        } else {
          res.render("../views/admin/khoahoc/listkhoahoc.ejs", { data });
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
    if (req.session.user) {
      let { id } = req.params;
      if (!Number(id)) {
        res.redirect("/admin/khoahoc");
      }
      try {
        let Xoa = await khoaHocService.delete(id);
        if (Xoa) {
          //util.setSuccess(200, 'TK xoa thanh cong')
          res.status(204).redirect("/admin/khoahoc");
        } else {
          res.render("../views/admin/khoahoc/listkhoahoc.ejs", { error });
        }
        return; //util.send(res)
      } catch (error) {
        // util.setError(400,error)
        return; //util.send(res)
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
      const created = await khoaHocService.add(data);
      res.status(201, { created }).redirect("/admin/khoahoc");
    } catch (error) {
      return error;
    }
  }
  static async update(req, res) {
    const altered = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      return console.log("Id not number !!!");
    }
    try {
      const update = await khoaHocService.Update(id, altered);
      if (!update) {
        res.status(401, { update }).redirect("/admin/khoahoc");
      } else {
        res.status(204, { update }).redirect("/admin/khoahoc");
      }
      res.status(404, { update }).redirect("/admin/khoahoc");
    } catch (error) {
      return error;
    }
  }
}

export default khoaHocController;
