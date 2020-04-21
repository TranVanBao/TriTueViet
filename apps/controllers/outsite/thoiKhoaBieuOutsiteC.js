import date from "s-date";
import lopHocService from "../../services/lopHocService";
import baivietService from "../../services/baivietService";
class thoikhoabieuC {
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
        let data = data1[0];
       if (data.length > 0) {
          res.render("../views/outsite/trangcanhan/listthoikhoabieuOut.ejs", {
            data,baiviet,
            user,
            date
          });
        } else {
          res.render("../views/outsite/trangcanhan/listthoikhoabieuOut.ejs", {
            data,baiviet,
            user,
            date
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

export default thoikhoabieuC;
