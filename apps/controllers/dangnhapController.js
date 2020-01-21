import bcrypt from "bcryptjs";

import dangnhapService from "../services/dangnhapService";

class dangnhapController {
  static async addTK(req, res) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.matkhau, salt);
    let { email } = { ...req.body };
    let quyenhang = 'Học Viên'
    let trangthai = 1
    if (email.trim().length > 0) {
      let kiemtra = await dangnhapService.getBylogin(email);
      console.log(kiemtra);      
      if (kiemtra.length > 0) {
        res.redirect("/?kq=0&mes=Email đã tồn tại");
      } else {
        let data = { ...req.body, matkhau: hash , quyenhang ,trangthai};
        try {
          const createdTK = await dangnhapService.add(data);
          if (createdTK) {
            res.redirect(`/?kq=1&mes=Đăng ký thành công!`);
          } else {
            res.redirect(`/?kq=0&mes=Đã có lỗi xin đăng ký lại !!!`);
          }
        } catch (error) {
          return error;
        }
      }
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
      console.log(alteredtk);
      const updatetk = await dangnhapService.UpdateTK(id, alteredtk);
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
    const { id } = req.params;

    if (!Number(id)) {
      console.log("id not a Number !!!");
    }

    try {
      const thetk = await dangnhapService.getByID(id);

      if (!thetk) {
        res.redirect("/admin/taikhoan");
      } else {
        res.redirect("/admin/taikhoan");
      }
    } catch (error) {
      return error;
    }
  }

  static async getlogin(req, res) {
    const { email, matkhau } = req.body;
    try {
      const thetk = await dangnhapService.getBylogin(email);
      console.log(thetk[0].matkhau);
      let user = thetk[0];
      if (!thetk) {
        res.redirect("/admin/taikhoan?kq=0");
      } else {
        if (bcrypt.compareSync(matkhau, thetk[0].matkhau)) {
          req.session.user = user;
          res.render("../views/admin/index.ejs");
          // res.redirect("/admin/taikhoan?kq=1");
        } else res.redirect("/");
      }
      return error;
    } catch (error) {
      return error;
    }
  }
}

export default dangnhapController;
