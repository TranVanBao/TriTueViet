import { validationResult } from "express-validator";
import date from "s-date";
import lopHocService from "../services/lopHocService";
import khoaHocService from "../services/khoaHocService";
import dangkyService from "../services/dangkyService";

class lophocController {
  static async getAll(req, res) {
    if (req.session.user) {
      try {
        console.log(123);
        const data = await lopHocService.getAll();
        const khoahoc = await khoaHocService.getAll();
        if (data.length > 0) {
          res.render("../views/admin/lophoc/listlophoc.ejs", {
            data,
            date,
            khoahoc
          });
        } else {
          res.render("../views/admin/lophoc/listlophoc.ejs", {
            data,
            khoahoc,
            message: "Khong co hoc vien nao"
          });
        }
        return 0;
      } catch (error) {
        return error;
      }
    } else {
      return res.redirect("/");
    }
  }

  static async Delete(req, res) {
    if (req.session.user) {
      let { id } = req.params;
      if (!Number(id)) {
        console.log("ID not Number !!!");
        res.redirect("/admin/lophoc");
      }
      try {
        let Xoa = await lopHocService.delete(id);
        if (Xoa) {
          res.status(204).redirect("/admin/lophoc");
        } else {
          res.status(404).redirect("/admin/lophoc");
        }
        return;
      } catch (error) {
        return error;
      }
    } else {
      return res.redirect("/");
    }
  }

  static async add(req, res) {
    let data = { ...req.body };
    console.log(data);
    try {
      const created = await lopHocService.add(data);
      return res.status(204, { created }).redirect("/admin/lophoc");
    } catch (error) {
      return error;
    }
  }

  static async update(req, res) {
    const altered = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      console.log("Id not a Number !!!");

      res.status(404).redirect("/admin/lophoc");
    }
    try {
      const update = await lopHocService.Update(id, altered);
      if (!update) {
        res.status(404).redirect("/admin/lophoc");
      } else {
        res.status(204).redirect("/admin/lophoc");
      }
      return;
    } catch (error) {
      return error;
    }
  }

  static async getAllhocvien(req, res) {
    if (req.session.user) { 
    try {
      const { id } = req.params;
      const data = await dangkyService.getByIDLop(id);
      //  console.log(data);

      const lophoc = await lopHocService.getByID(id);
      if (data.length > 0) {
        res.render("../views/admin/dangky/listdangky.ejs", {
          data,
          date,
          lophoc
        });
      } else {
        res.render("../views/admin/dangky/listdangky.ejs", {
          data,
          lophoc,
          date,
          message: "Khong co hoc vien nao"
        });
      }
      return 0;
    } catch (error) {
      return error;
    }} else {
      return res.redirect("/");
    }
  }
}

export default lophocController;
