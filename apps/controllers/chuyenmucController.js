var chuyenmucService = require("../services/chuyenmucService");

let d = new Date();
d.getDate();
d.getMonth();
d.getFullYear();
let n = d.getDate() + d.getMonth() + d.getFullYear();

class baiVietController {
  static async getAll(req, res) {
    if (
      req.session.user.quyenhang == "Admin" ||
      req.session.user.quyenhang == "Nhân Viên"
    ) {
      try {
        const user = req.session.user;
        const data = await chuyenmucService.getAll();
        if (data.length > 0) {
          res.render("../apps/views/admin/chuyemuc/listchuyenmuc.ejs", {
            data,
            user
          });
        } else {
          res.render("../apps/views/admin/chuyemuc/listchuyenmuc.ejs", {
            data,
            user
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

  static async update(req, res) {
    let id = req.params.id;
    let altered = { ...req.body };
    try {
      const update = await chuyenmucService.Update(id, altered);
      if (!update) {
        res.redirect("/admin/chuyenmuc?kq=0");
      } else {
        res.redirect("/admin/chuyenmuc?kq=1");
      }
    } catch (error) {
      return res.redirect("/admin/chuyenmuc?kq=0");
    }
  }

  static async add(req, res) {
    let data = { ...req.body };
    try {
      const created = await chuyenmucService.Save(data);
      if (created) {
        res.redirect("/admin/chuyenmuc?kq=1&mes=Thêm thành công !!!");
      } else
        res.redirect("/admin/chuyenmuc?kq=0&mes=Thêm không thành công !!!");
    } catch (error) {
      return error;
    }
  }
}

module.exports = baiVietController;
