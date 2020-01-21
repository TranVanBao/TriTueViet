import { validationResult } from "express-validator";

import phanhoiService from "../services/phanHoiService";

class phanhoiController {
  static async getAll(req, res) {
    if (req.session.user) { 
    try {
      const data = await phanhoiService.getAll();
      if (data.length > 0) {
        res.render("../views/admin/forum/listforum.ejs", { data });
      } else {
        res.render("../views/admin/forum/listforum.ejs", {
          data,
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

  static async Delete(req, res) {
    if (req.session.user) { 
    let { id } = req.params;
    if (!Number(id)) {
      console.log("ID not Number !!!");
      res.redirect("/admin/lophoc");
    }
    try {
      let Xoa = await phanhoiService.delete(id);
      if (Xoa) {
        res.status(204).redirect("/admin/lophoc");
      } else {
        res.status(404).redirect("/admin/lophoc");
      }
      return;
    } catch (error) {
      return error;
    }} else {
      return res.redirect("/");
    }
  }

  static async add(req, res) {
    let validate = validationResult(req);
    if (!validate.isEmpty()) {
      console.log(validate.errors);
    }
    let data = { ...req.body };
    console.log(data);

    try {
      const created = await phanhoiService.add(data);
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
      const update = await phanhoiService.Update(id, altered);
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

 
}

export default phanhoiController;
