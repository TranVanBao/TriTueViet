import date from "s-date";
import lopHocService from "../../services/lopHocService";
import khoaHocService from "../../services/khoaHocService";
import giangVienService from "../../services/giangVienService";
import dangkyService from "../../services/dangkyService";
import baivietService from "../../services/baivietService";
class lophocController {
  static async getAll(req, res) {
    if ((req.session.user.quyenhang = "Giảng Viên")) {
      try {
        let user = [];
        if (req.session.user) {
          user = req.session.user;
        }
        let trangthai = req.params.trangthai;
        const data1 = await lopHocService.getAll(trangthai);
        const baiviet = await baivietService.getNew();
        const data = data1[0];
        if (data.length > 0) {
          res.render("../views/outsite/trangcanhan/listlophocOut.ejs", {
            data,baiviet,
            user,
            date
          });
        } else {
          res.render("../views/outsite/trangcanhan/listlophocOut.ejs", {
            data,baiviet,
            date,
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
  static async get1lop(req, res) {
    if ((req.session.user.quyenhang = "Giảng Viên")) {
      try {
        let trangthai = req.params.trangthai;
        const data1 = await lopHocService.get1lop(trangthai);
        const khoahoc = await khoaHocService.getAll();
        const giangvien = await giangVienService.getAll();
        const baiviet = await baivietService.getNew();
        const data = data1[0];
        if (data.length > 0) {
          res.render("../views/outsite/trangcanhan/listlophocOut.ejs", {
            data,baiviet,
            date,
            khoahoc,
            giangvien
          });
        } else {
          res.render("../views/outsite/trangcanhan/listlophocOut.ejs", {
            data,baiviet,
            date,
            khoahoc,
            giangvien,
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

  static async getAllhocvien(req, res) {
    if ((req.session.user.quyenhang = "Giảng Viên")) {
      try {
        let user = [];
        if (req.session.user) {
          user = req.session.user;
        }
        const { id } = req.params;
        const data = await dangkyService.getByIDLop(id);
        const lophoc = await lopHocService.getByID(id);
        const baiviet = await baivietService.getNew();
        if (data.length > 0) {
          res.render("../views/outsite/trangcanhan/listdangkyOut.ejs", {
            data,
            user,baiviet,
            date,
            lophoc
          });
        } else {
          res.render("../views/outsite/trangcanhan/listdangkyOut.ejs", {
            data,
            user,baiviet,
            lophoc,
            date,
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
}

export default lophocController;
