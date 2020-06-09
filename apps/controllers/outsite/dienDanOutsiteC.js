var diendanService = require("../../services/dienDanService")
var baivietService = require("../../services/baivietService")
class diendanController {
  static async getAll(req, res) {
    if (req.session.user) {
      try {
        let user = [];
        if (req.session.user) {
          user = req.session.user;
        }
        let { id } = req.params;
        const data1 = await diendanService.gettheotk(id);     
        const baiviet = await baivietService.getNew(); 
        let data = data1[0];
        if (data.length > 0) {
          res.render("../views/outsite/trangcanhan/listforum.ejs", {
            data,baiviet,
            user
          });
        } else {
          res.render("../views/outsite/trangcanhan/listforum.ejs", {
            data,baiviet,
            user,
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

  static async Delete(req, res) {
    if (req.session.user) {
      let { id } = req.params;
      if (!Number(id)) {
        console.log("ID not Number !!!");
        res.redirect("/taikhoan/canhan?kq=0&mes=Có lỗi!!!");
      }
      try {
        let Xoa = await diendanService.delete(id);
        if (Xoa) {
          res.redirect("/taikhoan/canhan?kq=1&mes=Thành Công!!");
        } else {
          res.redirect("/taikhoan/canhan?kq=0&mes=Có lỗi!!!");
        }
        return;
      } catch (error) {
        return error;
      }
    } else {
      return res.redirect("/");
    }
  }

  static async update(req, res) {
    if (req.session.user) {
    const altered = req.body;
    const id = req.params.id
    const  id_tk  = req.session.user.id; console.log(altered);
    try {         
      const update = await diendanService.Update(id, altered);      
      if (!update) {
        res.redirect(`/taikhoan/diendan/`+ id_tk +`?kq=0&mes=Không thành công !!!`);
      } else {
        res.redirect(`/taikhoan/diendan/`+ id_tk +`?kq=1&mes=Cập nhật thành công.`);
      }
      return;
    } catch (error) {
      return error;
    }
  } else {
    req.redirect("/")
  }
  }

  static async getA(req, res) {
    if (req.session.user) {
      try {
        let user = [];
        if (req.session.user) {
          user = req.session.user;
        }
        let { id } = req.params;
        const data1 = await diendanService.getByID(id);     
        const baiviet = await baivietService.getNew();
        let data = data1[0][0];              
        if (data.length > 0) {
          res.render("../views/outsite/trangcanhan/updatebaiviet.ejs", {
            data,baiviet,
            user
          });
        } else {
          res.render("../views/outsite/trangcanhan/updatebaiviet.ejs", {
            data,baiviet,
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
}

module.exports = diendanController;
