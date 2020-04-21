import date from "s-date";
import mail from "../../helpers/nodemailer"
import dangkyService from "../services/dangkyService";
import lopHocService from "../services/lopHocService";

class dangkyController {
  static async getAll(req, res) {     
    if(req.session.user.quyenhang == "Admin" || req.session.user.quyenhang == "Nhân Viên"){
    try {
      const user = req.session.user
      const data1 = await dangkyService.getAllHV();
      var data = data1[0];      
      const lophoc = await lopHocService.getsapmo();
      if (data.length > 0) {
        res.render("../views/admin/hocvien/listhocvien.ejs", {
          data, user,
          lophoc,
          date,
          message: 1
        });
      } else {
        res.render("../views/admin/hocvien/listhocvien.ejs", {
          data, user,
          lophoc,
          date,
          message: 0
        });
      }
    } catch (error) {
      return error;
    }
  }else{ return res.redirect('/') }
  }

  static async Delete(req, res) {    
    if(req.session.user.quyenhang == "Admin" || req.session.user.quyenhang == "Nhân Viên" ){
    let { id } = req.params;
    if (!Number(id)) {
      res.redirect("/admin/hocvien?kq=0&mes=Lỗi xác nhận đối tượng !!!");
      return; //util.send(res);
    }
    try {
      let Xoa = await dangkyService.delete(id);
      if (Xoa) {
        res.redirect("/admin/hocvien?kq=1&mes=Xóa Thành Công !!!");
      } else {
        res.redirect("/admin/hocvien?kq=0&mes=Có Lỗi Xảy Ra !!!");
      }
      return;
    } catch (error) {
      return error;
    }
  }else{ return res.redirect('/') }
  }

  static async add(req, res) {
    let { thanhtoan, email , tenkhachhang} = req.body;
    if (thanhtoan == "") {
      thanhtoan = 0;
    }
    let trangthai = 1     
    await mail(email,tenkhachhang);
    let data = await { ...req.body, thanhtoan ,trangthai};
    try {
      const created = await dangkyService.add(data);

      if (created == null) {
        res.redirect("/admin/hocvien?kq=0&mes=Thêm Không Thành Công !!!");
      } else {
        res.redirect("/admin/hocvien?kq=1&mes=Thêm Thành Công !!!");
      }
    } catch (error) {
      return error;
    }
  }

  static async update(req, res) {
    let thanhtoan = req.body.thanhtoan;
    if (thanhtoan == "") {
      thanhtoan = 0;
    }
    let altered = await { ...req.body, thanhtoan };
    const { id } = req.params;
    try {
      const update = await dangkyService.Update(id, altered);
      if (!update) {
        res.redirect("/admin/hocvien?kq=0&mes=Sửa Không Thành Công !!!");
      } else {
        res.redirect("/admin/hocvien?kq=1&mes=Sửa Thành Công !!!");
      }
      res.redirect("/admin/hocvien");
    } catch (error) {
      return error;
    }
  }

  
}

export default dangkyController;
