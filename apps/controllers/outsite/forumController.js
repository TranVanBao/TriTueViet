var date = require("s-date")
var diendanService = require("../../services/dienDanService")
var khoaHocService = require("../../services/khoaHocService")
var phanHoiService = require("../../services/phanHoiService")
var baivietService = require("../../services/baivietService")

class diendanController {
  static async getAll(req, res) {
    try {
      let limit = req.params.limit;
       let user = [];
      if (req.session.user) {
        user = req.session.user;
      }
      const khoahoc = await khoaHocService.getAll();
      const baiviet = await baivietService.getNew();
      const data1 = await diendanService.getAll(limit);
      var data = data1[0];
      if (data.length > 0) {
        res.render("../views/outsite/forums/baiviet.ejs", {
          data,baiviet,
          limit,
          date,
          khoahoc,
          user
        });
      } else {
        res.render("../views/outsite/forums/baiviet.ejs", {
          data, limit,baiviet,
          date,
          khoahoc,
          user,
          message: "Khong co du lieu"
        });
      }
      return 0;
    } catch (error) {
      return error;
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
        let Xoa = await diendanService.delete(id);
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
    if (req.session.user) {
      var id_taikhoan = req.session.user.id;
      const trangthai = 1
      let data = await { ...req.body, id_taikhoan,trangthai };
      try {        
        const created = await diendanService.Save(data);
        if (created == null) {
          res.redirect("/forum/hoi-bai?kq=0&mes=Không tạo được bài viết");
        } else {
          res.redirect("/forum/hoi-bai?kq=1");
        }
      } catch (error) {
        return error;
      }
    } else {
      res.redirect("/forum/hoi-bai?kq=0&mes=Xin vui lòng đăng nhập!!!");
    }
  }

  static async getHoiBai(req, res) {
    try {
      let user = [];
      if (req.session.user) {
        user = req.session.user;
      }
      const khoahoc = await khoaHocService.getAll();
      const baiviet = await baivietService.getNew();
      if (khoahoc.length > 0) {
        res.render("../views/outsite/forums.ejs", {
          data: khoahoc,baiviet,
          khoahoc,
          user
        });
      } else {
        res.render("../views/outsite/forums.ejs", {
          data: khoahoc,baiviet,
          khoahoc,
          user,
          message: "Khong co du lieu"
        });
      }
      return 0;
    } catch (error) {
      return error;
    }
  }
  static async getChiTiet(req, res) {
    try {
      let user = [];
      if (req.session.user) {
        user = req.session.user;
      }
      const khoahoc = await khoaHocService.getAll();
      const { id } = req.params;
      const data = await diendanService.getByID(id);
      const comment = await phanHoiService.getByID(id);
      const baiviet = await baivietService.getNew();

      if (data.length > 0) {
        res.render("../views/outsite/forums/xembaiviet.ejs", {
          data: data,baiviet,
          user,
          date,
          comment,
          khoahoc
        });
      } else {
        res.redirect("/forum/baiviet?kq=0&mes=Bài viết đã bị xóa!!!");
      }
      return 0;
    } catch (error) {
      return error;
    }
  }
  // ========coment ==================

  static async addcoment(req, res) {
    let id_diendan = req.params.id;
    if (req.session.user) {
     console.log();
      let id_tktraloi = req.session.user.id;
      let data = await { ...req.body, id_tktraloi, id_diendan };
      try {
        const created = await phanHoiService.add(data);
        if (created == null) {
          res.redirect("/forum/chi-tiet?kq=0&mes=Không trả lời được!!! ");
        } else {
          res.redirect(`/forum/chi-tiet/` + id_diendan + `?kq=1`);
        }
      } catch (error) {
        return error;
      }
    } else {
      res.redirect(`/forum/chi-tiet/`+id_diendan+`?kq=0&mes=Xin vui lòng đăng nhập!!!`);
    }
  }

  static async traloicoment(req, res) {
    let id_diendan = req.params.id;
    if (req.session.user) {
      let id_diendan = req.params.id;
      let id_tktraloi = req.session.user.id;
      let noidungtraloi = req.body.noidungtraloi;
      let data = await { ...req.body, id_tktraloi, id_diendan };
      try {
        const created = await phanHoiService.add(data);
        if (created == null) {
          res.redirect("/forum/chi-tiet?kq=0&mes=Không trả lời được!!! ");
        } else {
          res.redirect(`/forum/chi-tiet/` + id_diendan + `?kq=1`);
        }
      } catch (error) {
        return error;
      }
    } else {
      res.redirect(`/forum/chi-tiet/`+id_diendan+`?kq=0&mes=Xin vui lòng đăng nhập!!!`);
    }
  }

  // =================== xem forum theo khoa hoc ===================
  static async gettheokhoahoc(req, res) {
    try {
      let user = [];
      if (req.session.user) {
        user = req.session.user;
      }
      const limit = req.params.limit;
      const khoahoc = await khoaHocService.getAll();
      const id_khoahoc = req.params.id;
      const tenkhoahoc = req.params.tenkhoahoc;
      const baiviet = await baivietService.getNew();
      const data = await diendanService.gettheokhoahoc(id_khoahoc);
      if (data.length > 0) {
        res.render("../views/outsite/forums/baiviet.ejs", {
          data: data,limit,
          user,baiviet,
          date,
          khoahoc,
          tenkhoahoc
        });
      } else {
        res.redirect(`/forum/baiviet/`+limit+`?kq=0&mes=Không có bài phù hợp!!!`);
      }
      return 0;
    } catch (error) {
      return error;
    }
  }
}

module.exports = diendanController;
