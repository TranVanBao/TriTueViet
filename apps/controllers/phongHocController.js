import phonghocService from "../services/phongHocService";

class phonghocController {
  static async getAll(req, res) {
    if (req.session.user.quyenhang == "Admin" || req.session.user.quyenhang == "Nhân Viên") { 
    try {
      const user = req.session.user
      const data = await phonghocService.getAll();
      if (data.length > 0) {
        res.render("../views/admin/phonghoc/listphonghoc.ejs", { data ,user, message : 1});
      } else {
        res.render("../views/admin/phonghoc/listphonghoc.ejs", { data,user, message : 0});
      }
    } catch (error) {
      return error;
    }} else {
      return res.redirect("/");
    }
  }

  static async Delete(req, res) {
    if (req.session.user.quyenhang == "Admin" || req.session.user.quyenhang == "Nhân Viên") { 
    let { id } = req.params;
    if (!Number(id)) {
      console.log("id not a number!!!");
    }
    try {
      let Xoa = await phonghocService.delete(id);
      if (Xoa) {
        res.redirect("/admin/phonghoc");
      } else {
        res.redirect("/admin/phonghoc");
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
      const created = await phonghocService.add(data);
      if (created == null) {
        res.redirect("/admin/phonghoc");
      } else {
        res.redirect("/admin/phonghoc");
      }
    } catch (error) {
      return error;
    }
  }

  static async update(req, res) {
    const altered = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      return res.redirect("/admin/phonghoc");
    }
    try {
      const update = await phonghocService.Update(id, altered);
      if (!update) {
        res.redirect("/admin/phonghoc");
      } else {
        res.redirect("/admin/phonghoc");
      }
    } catch (error) {
      return error;
    }
  }
}

export default phonghocController;
