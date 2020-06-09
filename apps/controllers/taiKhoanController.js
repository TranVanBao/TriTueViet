var bcrypt = require("bcryptjs")

var taiKhoanService = require("../services/taiKhoanService")

class taiKhoanController {
  static async getAllTK(req, res) {
    if (req.session.user.quyenhang == "Admin") { 
    try {
      const user = req.session.user
      let { quyenhang } = req.params;
      const data = await taiKhoanService.getAllTaiKhoan(quyenhang);
      const phanquyen = await taiKhoanService.getAllquyen(quyenhang);
      if (data.length > 0) {
        res.render("../views/admin/taikhoan/listtaikhoan.ejs", {
          data, user,
          phanquyen,
          message: 1
        });
      } else {
        res.render("../views/admin/taikhoan/listtaikhoan.ejs", {
          data, user,
          phanquyen,
          message: 0
        });
      }
    } catch (error) {
      return error;
    }} else {
      return res.redirect("/");
   }
  }

  static async DeleteTK(req, res) {
   if (req.session.user.quyenhang == "Admin") {       
    let { id,quyenhang } = req.params;  
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
    }} else {
      return res.redirect("/");
    }
  }

  static async addTK(req, res) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.matkhau, salt);
    let { quyenhang } = { ...req.body };    
    let data = { ...req.body, matkhau: hash };    
    try {
      const createdTK = await taiKhoanService.add(data);
      if (createdTK) {
        res.redirect(`/admin/taikhoan/`+quyenhang+`?kq=1`);
      } else {
        res.redirect(`/admin/taikhoan/`+quyenhang+`?kq=0`);
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
        res.redirect(`/admin/taikhoan/`+quyenhang+`?kq=0`);
      } else {
        res.redirect(`/admin/taikhoan/`+quyenhang+`?kq=1`);
      }
    } catch (error) {
      return error;
    }
  }

  static async getATk(req, res) {
    if (req.session.user.quyenhang == "Admin") {       
    try {
      const user = req.session.user
      const id = req.session.user.id 
     const data = req.session.user
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
    }} else {
      return res.redirect("/");
    }
  }

  

}

module.exports = taiKhoanController;
