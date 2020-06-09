var bcrypt = require("bcryptjs")

var taiKhoanService = require("../services/taiKhoanService")

let d = new Date();
d.getDate();
d.getMonth();
d.getFullYear();
let n = d.getDate() + d.getMonth() + d.getFullYear();

class taiKhoanController {
  static async updatematkhau(req, res) {
    const { matkhaucu, matkhau } = req.body;
    const { id } = req.params;
    console.log(req.body);
    try {
      const thetk = await taiKhoanService.getByID(id);
      console.log(thetk[0].matkhau);
      if (!thetk) {
        res.redirect("/admin/canhan?kq=0");
      } else {
        if (bcrypt.compareSync(matkhaucu, thetk[0].matkhau)) {
          let salt = bcrypt.genSaltSync(10);
          let hash = bcrypt.hashSync(matkhau, salt);
          let data = { matkhau: hash };
          try {
            const updatetk = await taiKhoanService.UpdateTK(id, data);
            if (!updatetk) {
              res.redirect(`/admin/canhan?kq=0`);
            } else {
              res.redirect(`/?kq=1`);
            }
          } catch (error) {
            return error;
          }
        } else res.redirect("/");
      }
      return error;
    } catch (error) {
      return error;
    }
  }

  static async updatedtk(req, res) {

    let { email, hinhanh, tentaikhoan } = req.body;
    email = email.replace(/\s/g, "");
    tentaikhoan = tentaikhoan.replace(/\s/g, "");
    if (req.file) {
       hinhanh = n + "-" + req.file.originalname;
    }
    const alteredtk = { email, tentaikhoan, hinhanh };
    const { id } = req.params;
    if (!Number(id)) {
      console.log("ID Not a Number!!!");
    }
    try {
      console.log(alteredtk);
      const updatetk = await taiKhoanService.UpdateTK(id, alteredtk);
      if (!updatetk) {
        res.redirect(`/admin/canhan?kq=0`);
      } else {
        res.redirect(`/?kq=1&mes='Cập nhật thành công!'`);
      }
    } catch (error) {
      return error;
    }
  }

  static async getATk(req, res) {
    if (req.session.user.quyenhang == "Admin") {
      try {
        const user = req.session.user
        const id = req.session.user.id;
        const data = req.session.user;
        const thetk = await taiKhoanService.getByID(id);
        if (!thetk) {
          res.render("../views/admin/taikhoan/trangcanhan.ejs", {
            data, user,
            phanquyen,
            message: 0
          });
        } else {
          res.render("../views/admin/taikhoan/trangcanhan.ejs", {
            data, user,
            message: 1
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
