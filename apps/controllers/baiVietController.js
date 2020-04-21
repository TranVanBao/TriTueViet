var baiVietService = require("../services/baivietService");
var chuyenmucService =require("../services/chuyenmucService");

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
        const data1 = await baiVietService.getAll();
        const chuyenmuc = await chuyenmucService.getAll();
        let data = data1[0];
        if (data.length > 0) {
          res.render("../apps/views/admin/baiviet/listBaiViet.ejs", {
            data,
            user,
            chuyenmuc
          });
        } else {
          res.render("../apps/views/admin/baiviet/listBaiViet.ejs", {
            data,
            user,
            chuyenmuc
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

  static async getAdd(req, res) {
    if (
      req.session.user.quyenhang == "Admin" ||
      req.session.user.quyenhang == "Nhân Viên"
    ) {
      try {
        const user = req.session.user;
        const chuyenmuc = await chuyenmucService.getAll();
        if (chuyenmuc.length > 0) {
          res.render("../apps/views/admin/baiviet/addbaiviet.ejs", {
            user,
            chuyenmuc
          });
        } else {
          res.render("../apps/views/admin/baiviet/addbaiviet.ejs", {
            user,
            chuyenmuc
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
  static async getUpdate(req, res) {
    if (
      req.session.user.quyenhang == "Admin" ||
      req.session.user.quyenhang == "Nhân Viên"
    ) {
      try {
        const user = req.session.user;
        const id = req.params.id;
        const data1 = await baiVietService.getA(id);
        const chuyenmuc = await chuyenmucService.getAll();
        const data = data1[0][0]; 
        if (data.length > 0) {
          res.render("../apps/views/admin/baiviet/updateBV.ejs", {
            data,
            chuyenmuc,
            user
          });
        } else {
          res.render("../apps/views/admin/baiviet/updateBV.ejs", {
            data,
            chuyenmuc,
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

  static async Delete(req, res) {
    if (
      req.session.user.quyenhang == "Admin" ||
      req.session.user.quyenhang == "Nhân Viên"
    ) {
      let { id } = req.params;
      if (!Number(id)) {
        res.redirect("/admin/baiviet?kq=0&mes=Lỗi dữ liệu!!!");
      }
      try {
        let Xoa = await baiVietService.delete(id);
        if (Xoa) {
          res.redirect("/admin/baiviet?kq=1&mes=Thành Công!!");
        } else {
          res.redirect("/admin/baiviet?kq=0&mes=Thất Bại!!!");
        }
        return;
      } catch (error) {
        return error;
      }
    } else {
      return res.redirect("/");
    }
  }
  static async update(req, res) {
    try {
      let id = req.params.id; 
      let hinhanh = req.body.hinhanh;
      if (req.file) {
        hinhanh = n + "-" + req.file.originalname;
      }
      let altered = { ...req.body, hinhanh };
      const update = await baiVietService.Update(parseInt(id), altered);
      if (!update) {
        res.redirect("/admin/baiviet?kq=0");
      } else {
        res.redirect("/admin/baiviet?kq=1");
      }
    } catch (error) {
      return res.redirect("/admin/baiviet");
    }
  }

  static async add(req, res) {
    let hinhanh = "";
    if (req.file) {
      hinhanh = n + "-" + req.file.originalname;
    }
    let id_taikhoan = req.session.user.id;
    let data = { ...req.body, hinhanh, id_taikhoan };
    console.log(data);
    try {
      const created = await baiVietService.Save(data);
      if (created !== 0) {
        res.redirect("/admin/baiviet?kq=1&mes=Thêm thành công !!!");
      } else res.redirect("/admin/baiviet?kq=0&mes=Thêm không thành công !!!");
    } catch (error) {
      return error;
    }
  }
}

module.exports = baiVietController;
