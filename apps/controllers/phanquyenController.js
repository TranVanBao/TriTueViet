import phanquyenService from "../services/phanquyenService";

class phanquyenController {
  static async getAll(req, res) {
    if (req.session.user.quyenhang =="Admin") { 
    try {
      const user = req.session.user
      const data = await phanquyenService.getAll();
      if (data.length > 0) {
        res.render("../views/admin/phanquyen/listphanquyen.ejs", {
          data,user,
          message: 1
        });
      } else {
        res.render("../views/admin/phanquyen/listphanquyen.ejs", {
          data, user,
          message: 0
        });
      }
    } catch (error) {
      return error;
    }} else {
      return res.redirect("/");
    }
  }

  static async Delete(req, res) {
    if (req.session.user.quyenhang == "Admin") { 
    let { id } = req.params;
    if (!Number(id)) {
      console.log("id not a number!!!");
    }
    try {
      let Xoa = await phanquyenService.delete(id);
      if (Xoa) {
        res.redirect("/admin/phanquyen?kq=1&mes='Xóa Thành Công'");
      } else {
        res.redirect("/admin/phanquyen?kq=0");
      }
    } catch (error) {
      return error;
    }} else {
      return res.redirect("/");
    }
  }

  static async add(req, res) {
    let data = { ...req.body };
    try {
      const created = await phanquyenService.add(data);
      if (created == null) {
        res.redirect("/admin/phanquyen?kq=0");
      } else {
        res.redirect("/admin/phanquyen?kq=1&mes='Thêm thành công'");
      }
    } catch (error) {
      return error;
    }
  }

  static async update(req, res) {
    const altered = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      return res.redirect("/admin/phanquyen?kq=0&mes='Id not a number!!!'");
    }
    try {
      const update = await phanquyenService.Update(id, altered);
      if (!update) {
        res.redirect("/admin/phanquyen?kq=0");
      } else {
        res.redirect("/admin/phanquyen?kq=1");
      }
    } catch (error) {
      return error;
    }
  }
}

export default phanquyenController;
