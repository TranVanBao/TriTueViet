import date from "s-date";
import lopHocService from "../services/lopHocService";
import khoaHocService from "../services/khoaHocService";
import giangVienService from "../services/giangVienService";
import dangkyService from "../services/dangkyService";
import phongHocService from "../services/phongHocService";
class lophocController {
  static async getAll(req, res) {
    if (req.session.user.quyenhang == "Admin" || req.session.user.quyenhang == "Nhân Viên") {
      try {
        const user = req.session.user
        let trangthai = req.params.id    
        const data1 = await lopHocService.getAll(trangthai);      
        const phonghoc = await phongHocService.getsudung(); 
        const data = data1[0];
        if (data.length > 0) {
          res.render("../views/admin/thoikhoabieu/listthiukhoabieu.ejs", {
            data, user,
            trangthai,
            date,
            phonghoc         
          });
        } else {
          res.render("../views/admin//thoikhoabieu/listthiukhoabieu.ejs", {
            data, user,
            date,
            trangthai,        
            phonghoc,
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

  static async getDanghoc(req, res) {
    if (req.session.user.quyenhang == "Admin" || req.session.user.quyenhang == "Nhân Viên") {
      try {
        const user = req.session.user
        let trangthai = req.params.id    
        const data1 = await lopHocService.get1lop(trangthai);      
        const phonghoc = await phongHocService.getsudung(); 
        const data = data1[0];
        if (data.length > 0) {
          res.render("../views/admin/thoikhoabieu/listthiukhoabieu.ejs", {
            data, user,
            trangthai,
            date,
            phonghoc         
          });
        } else {
          res.render("../views/admin//thoikhoabieu/listthiukhoabieu.ejs", {
            data, user,
            date,
            trangthai,        
            phonghoc,
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

  static async update(req, res) {
    const altered = req.body;
    const { id } = req.params;
    if (!Number(id)) {    
      res.redirect("/admin/thoikhoabieu/1?kq=1&mes=Lỗi lấy dữ liệu!!!");
    }
    try {
      const update = await lopHocService.Update(id, altered);     
      if (!update) {       
        res.redirect("/admin/thoikhoabieu/1?kq=0&mes=Lỗi cập nhật!!!");
      } else {        
        res.redirect("/admin/thoikhoabieu/1?kq=1&mes=Thành Công !!!");
      }
      return;
    } catch (error) {
      return error;
    }
  }
 
}

export default lophocController;
