var bcrypt = require("bcryptjs");
var randomstring = require("randomstring");
var taiKhoanService = require("../services/taiKhoanService");
var giangvienService = require("../services/giangVienService");
var mail = require("../../helpers/nodemailer");
class taiKhoanController {
  static async getAllTK(req, res) {
    if (req.session.user.quyenhang == "Admin") {
      try {
        const user = req.session.user;
        let { quyenhang } = req.params;
        const data = await taiKhoanService.getAllTaiKhoan(quyenhang);
        const phanquyen = await taiKhoanService.getAllquyen(quyenhang);
        const giangvien = await giangvienService.getAll();
        if (data.length > 0) {
          res.render("../views/admin/taikhoan/listtaikhoan.ejs", {
            data,
            user,
            giangvien,
            phanquyen,
            message: 1,
          });
        } else {
          res.render("../views/admin/taikhoan/listtaikhoan.ejs", {
            data,
            user,
            giangvien,
            phanquyen,
            message: 0,
          });
        }
      } catch (error) {
        return error;
      }
    } else {
      return res.redirect("/");
    }
  }

  static async DeleteTK(req, res) {
    if (req.session.user.quyenhang == "Admin") {
      let { id, quyenhang } = req.params;
      if (!Number(id)) {
        console.log("id Not a Number!!!");
      }
      try {
        let XoaTK = await taiKhoanService.deleteTK(id);
        if (XoaTK) {
          res.redirect(`/admin/taikhoan/${quyenhang}`);
        } else {
          res.redirect(`/admin/taikhoan/${quyenhang}`);
        }
      } catch (error) {
        return error;
      }
    } else {
      return res.redirect("/");
    }
  }

  static async addTK(req, res) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.matkhau, salt);
    const token = randomstring.generate(4);
    const html = `Hi there,
    <br/>
    Cảm ơn bạn đã đăng ký!
    <br/>
    Xin hãy coppy mã và dán vào ô xác nhận để xác nhận email:
    <br/>
    Mã kích hoạt: <b>${token}</b>
    <br/>
    On the following page:
    <a href="http://localhost:3000/dangnhap/dangky/xacnhan/">http://localhost:3000/xacnhan</a>
    <br/><br/>
    Chúc bạn một ngày tốt lành.`;
    let { quyenhang } = { ...req.body };
    let data = { ...req.body, matkhau: hash, token };

    try {
      await mail(req.body.email, req.body.tentaikhoan, html);
      const createdTK = await taiKhoanService.add(data);
      let dulieu = { id_tk : createdTK.id }
      if (req.body.id_giangvien) {
        const update = await giangvienService.Update(
          req.body.id_giangvien,
          dulieu
        );
      }
      if (createdTK) {
        res.redirect(`/admin/taikhoan/` + quyenhang + `?kq=1`);
      } else {
        res.redirect(`/admin/taikhoan/` + quyenhang + `?kq=0`);
      }
    } catch (error) {
      return error;
    }
  }

  static async updatedtk(req, res) {
    const alteredtk = req.body;
    let { quyenhang } = { ...req.body };
    const { id } = req.params;
    if (!Number(id)) {
      console.log("ID Not a Number!!!");
    }
    try {
      const updatetk = await taiKhoanService.UpdateTK(id, alteredtk);
      if (!updatetk) {
        res.redirect(`/admin/taikhoan/` + quyenhang + `?kq=0`);
      } else {
        res.redirect(`/admin/taikhoan/` + quyenhang + `?kq=1`);
      }
    } catch (error) {
      return error;
    }
  }

  static async getATk(req, res) {
    if (req.session.user.quyenhang == "Admin") {
      try {
        const user = req.session.user;
        const id = req.session.user.id;
        const data = req.session.user;
        const thetk = await taiKhoanService.getByID(id);
        if (!thetk) {
          res.render("../views/admin/taikhoan/trangcanhan.ejs", {
            data,
            user,
            phanquyen,
            message: 0,
          });
        } else {
          res.render("../views/admin/taikhoan/trangcanhan.ejs", {
            data,
            user,
            message: 1,
          });
        }
      } catch (error) {
        return error;
      }
    } else {
      return res.redirect("/");
    }
  }
}

module.exports = taiKhoanController;
