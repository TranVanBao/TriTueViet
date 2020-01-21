import { validationResult } from "express-validator";

import hocVienService from "../services/hocVienService";

class hocVienController {
  static async getAll(req, res) {   
    if (req.session.user) {  
    try {
      const data = await hocVienService.getAll();
      if (data.length > 0) {
        res.render("../views/admin/hocvien/listhocvien.ejs", { data });
      } else {
        res.render("../views/admin/hocvien/listhocvien.ejs", {
          data,
          message: "Khong co hoc vien nao"
        });
      }
      return 0;
    } catch (error) {
      return error;
    } } else {
      return res.redirect("/");
    }
  }

  static async Delete(req, res) {
    console.log(req.session.user);
    if (req.session.user) { 
    let { id } = req.params;
    if (!Number(id)) {
      console.log("ID not Number !!!");
      res.redirect("/admin/hocvien");
    }
    try {
      let Xoa = await hocVienService.delete(id);
      if (Xoa) {
        res.status(204).redirect("/admin/hocvien");
      } else {
        res.status(404).redirect("/admin/hocvien");
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
    let validate = validationResult(req);
    if (!validate.isEmpty()) {
      console.log(validate.errors);     
    }
    let data = { ...req.body };
    try {
      const created = await hocVienService.add(data);   
      return  res.status(204,{ created }).redirect("/admin/hocvien");     
      
    } catch (error) {
      return error;
    }
  }

  static async update(req, res) {
    const altered = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      console.log("Id not a Number !!!");

      res.status(404).redirect("/admin/hocvien");
    }
    try {
      const update = await hocVienService.Update(id, altered);
      if (!update) {
        res.status(404).redirect("/admin/hocvien");
      } else {
        res.status(204).redirect("/admin/hocvien");
      }
      return;
    } catch (error) {
      return error;
    }
  }

  
}

export default hocVienController;
