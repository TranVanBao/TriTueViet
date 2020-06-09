var { validationResult } = require("express-validator")

var diendanService = require("../services/dienDanService")

class diendanController {
  static async getAll(req, res) {
    if (req.session.user.quyenhang == "Admin" || req.session.user.quyenhang == "Nhân Viên") {
      try {
        const user = req.session.user
        const data1 = await diendanService.getAllAd();
        let data = data1[0];
        if (data.length > 0) {
          res.render("../views/admin/forum/listforum.ejs", { data , user});
        } else {
          res.render("../views/admin/forum/listforum.ejs", {
            data, user,
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
    if (req.session.user.quyenhang == "Admin" || req.session.user.quyenhang == "Nhân Viên") {
      let { id } = req.params;
      if (!Number(id)) {        
        res.redirect("/admin/diendan?kq=0&mes=Lỗi dữ liệu !!!");
      }
      try {
        let Xoa = await diendanService.delete(id);
        if (Xoa) {
          res.redirect("/admin/diendan?kq=1&mes=Thành Công!!");
        } else {
          res.redirect("/admin/diendan?kq=0&mes=Thất Bại!!!");
        }
        return;
      } catch (error) {
        return error;
      }
    } else {
      return res.redirect("/");
    }
  }

}

module.exports = diendanController;
