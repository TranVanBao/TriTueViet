import date from "s-date";
import mail from "../../helpers/nodemailer"
import dangkyService from "../services/dangkyService";
import lopHocService from "../services/lopHocService";

class dangkyController {
  static async getAll(req, res) {     
    if(req.session.user.quyenhang == "Admin" || req.session.user.quyenhang == "Nhân Viên"){
    try {
      const user = req.session.user
      const data1 = await dangkyService.getAll();
      var data = data1[0];      
      const lophoc = await lopHocService.getsapmo();
      if (data.length > 0) {
        res.render("../views/admin/dangky/listdangky.ejs", {
          data, user,
          lophoc,
          date,
          message: 1
        });
      } else {
        res.render("../views/admin/dangky/listdangky.ejs", {
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
      res.redirect("/admin/dangky");
      return; //util.send(res);
    }
    try {
      let Xoa = await dangkyService.delete(id);
      if (Xoa) {
        res.redirect("/admin/dangky");
      } else {
        res.redirect("/admin/dangky");
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
    const html = `Xin chào,
    <br/>
    Cám ơn bạn đã đăng ký khóa học tại trung tâm chúng tôi!
    <br/><br/>
    Mong bạn hãy đến trung tâm thanh toán sớm nhất để có thể giữ chỗ và biết thêm thông tin.
    <br/>
    <br/><br/>
    Chúc bạn một ngày tốt lành.` 
    await mail(email,tenkhachhang, html);
    let data = await { ...req.body, thanhtoan ,trangthai};
    try {
      const created = await dangkyService.add(data);

      if (created == null) {
        res.redirect("/admin/dangky");
      } else {
        res.redirect("/admin/dangky");
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
        res.redirect("/admin/dangky");
      } else {
        res.redirect("/admin/dangky");
      }
      res.redirect("/admin/dangky");
    } catch (error) {
      return error;
    }
  }

  
}

export default dangkyController;
