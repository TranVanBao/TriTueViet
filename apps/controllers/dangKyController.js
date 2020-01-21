import date from "s-date";

import dangkyService from "../services/dangkyService";
import lopHocService from "../services/lopHocService";

class dangkyController {
  static async getAll(req, res) {
    console.log(req.session.user);    
    if(req.session.user){
    try {
      const data1 = await dangkyService.getAll();
      var data = data1[0];
      const lophoc = await lopHocService.getAll();
      if (data.length > 0) {
        res.render("../views/admin/dangky/listdangky.ejs", {
          data,
          lophoc,
          date,
          message: 1
        });
      } else {
        res.render("../views/admin/dangky/listdangky.ejs", {
          data,
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
    console.log(req.session.user);    
    if(req.session.user){
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
    let thanhtoan = req.body.thanhtoan;
    if (thanhtoan == "") {
      thanhtoan = 0;
    }
    let data = await { ...req.body, thanhtoan };
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
