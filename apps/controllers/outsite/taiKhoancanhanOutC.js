import bcrypt from "bcryptjs";

import taiKhoanService from "../../services/taiKhoanService";
import baivietService from "../../services/baivietService";
let d = new Date();
d.getDate();
d.getMonth();
d.getFullYear();
let n = d.getDate() + d.getMonth() + d.getFullYear();

class taiKhoanController {
  static async updatematkhau(req, res) {
    const { matkhaucu, matkhau } = req.body;
    const { id } = req.params;   
    try {
      const thetk = await taiKhoanService.getByID(id);     
      if (!thetk) {
        res.redirect("/?kq=0&mes=Không tìm thấy Id !!");
      } else {
        if (bcrypt.compareSync(matkhaucu, thetk[0].matkhau)) {
          let salt = bcrypt.genSaltSync(10);
          let hash = bcrypt.hashSync(matkhau, salt);
          let data = { matkhau: hash };
          try {
            const updatetk = await taiKhoanService.UpdateTK(id, data);
            if (!updatetk) {
              res.redirect(`/taikhoan/canhan?kq=0&mes=Cập nhật thất bại !!`);
            } else {
              res.redirect(`/taikhoan/canhan?kq=1&mes=Cập nhật thành công !!`);
            }
          } catch (error) {
            return error;
          }
        } else res.redirect("/taikhoan/canhan?kq=0&mes=Sai mật khẩu !!");
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
        res.redirect(`/taikhoan/canhan?kq=0&mes=Cập nhật thất bại !!`);
      } else {
        res.redirect(`/taikhoan/canhan/?kq=1&mes=Cập nhật thành công !!`);
      }
    } catch (error) {
      return error;
    }
  }

  static async getATk(req, res) {
    try {
      if (req.session.user) {
        let user = []
        if(req.session.user){
          user = req.session.user
        }
        const id = req.session.user.id;
       // const data = req.session.user;
        const data1 = await taiKhoanService.getByID(id);        
        const baiviet = await baivietService.getNew();
        const data = data1[0]
        if (!data) {
          res.render("../views/outsite/trangcanhan/trangcanhanOut.ejs", {
            data, user,baiviet,
            phanquyen,
            message: 0
          });
        } else {
          res.render("../views/outsite/trangcanhan/trangcanhanOut.ejs", {
            data,user,baiviet,
            message: 1
          });
        }
      } else {
        res.redirect(`/?kq=0&mes=Bạn chưa đăng nhập !!`);
      }
    } catch (error) {
      return error;
    }
  }


  
}

export default taiKhoanController;
