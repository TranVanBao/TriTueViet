var baivietService = require("../../services/baivietService");
var chuyenmucService = require("../../services/chuyenmucService");
var baivietService = require("../../services/baivietService");
var date = require("s-date");
class diendanController {
  static async getAll(req, res) {
    try {
      let user = [];
      if (req.session.user) {
        user = req.session.user;
      }
      let limit = req.params.limit;
      const data = await baivietService.getOutsite(parseInt(limit));
      const baiviet = await baivietService.getNew(); 
      const moiNhat = await baivietService.getNew();
      const chuyenmuc = await chuyenmucService.getAll();
      if (moiNhat[0].length != [] || !moiNhat.length) {
        res.render("../apps/views/outsite/blog.ejs", {
          data,baiviet,
          moiNhat,
          date,
          chuyenmuc,
          limit,
          user,mes:1
        });
      } else {
        res.render("../apps/views/outsite/blog.ejs", {
          data,baiviet,
          moiNhat,
          date,
          chuyenmuc,
          limit,
          user,mes:0
        });
      }
      return 0;
    } catch (error) {
      return error;
    }
  }
  static async getA(req, res) {
    try {
      let user = [];
      if (req.session.user) {
        user = req.session.user;
      }
      let limit = req.params.limit;
      let chuyenmuc1 = req.params.chuyenmuc;
      let id = req.params.id;
      const data = await baivietService.getNeWCM(parseInt(limit),chuyenmuc1);
      const moiNhat = await baivietService.getA(parseInt(id));
      const chuyenmuc = await chuyenmucService.getAll();
      const baiviet = await baivietService.getNew();
      if (moiNhat[0].length != [] || !moiNhat.length) {
        res.render("../apps/views/outsite/blog.ejs", {
          data,baiviet,
          moiNhat,
          date,
          chuyenmuc,
          limit,
          user,mes:1
        });
      } else {
        res.render("../apps/views/outsite/blog.ejs", {
          data,baiviet,
          moiNhat,
          date,
          chuyenmuc,
          limit,
          user,mes:0
        });
      }
      return 0;
    } catch (error) {
      return error;
    }
  }

  static async getChuyenMuc(req, res) {
    try {
      let user = [];
      if (req.session.user) {
        user = req.session.user;
      }
      let limit = req.params.limit;
      let chuyenmuc1 = req.params.chuyenmuc;
      const data = await baivietService.getNeWCM(parseInt(limit), chuyenmuc1);
      const baiviet = await baivietService.getNew();
      const chuyenmuc = await chuyenmucService.getAll();
      const moiNhat = await baivietService.getACM(chuyenmuc1);     
     
      if (moiNhat[0].length != [] || !moiNhat.length) {
        res.render("../apps/views/outsite/blog.ejs", {
          data,baiviet,
          moiNhat,chuyenmuc,
          date,
          limit,
          user, mes:1
        });
      } else {
        res.render("../apps/views/outsite/blog.ejs", {
          data,baiviet,
          moiNhat,chuyenmuc,
          date,
          limit,
          user, mes:0
          
        });
      }
      return 0;
    } catch (error) {
      return error;
    }
  }
}

module.exports = diendanController;
