var fs = require("fs")
var date = require("s-date")
var lopHocService = require("../../services/lopHocService")
var khoaHocService = require("../../services/khoaHocService")
var baivietService = require("../../services/baivietService")
let d = new Date();
d.getDate();
d.getMonth();
d.getFullYear();
let n = d.getDate() + d.getMonth() + d.getFullYear();

class khoaHocController {
  static async getAll(req, res) {
    try {
      let user = [];
      if (req.session.user) {
        user = req.session.user;
      }
      const data1 = await lopHocService.getAllOusite();
      const baiviet = await baivietService.getNew();
      const data = data1[0];
      if (data.length > 0) {
        res.render("../views/outsite/khoahoc.ejs", { data, date, user,baiviet });
      } else {
        res.render("../views/outsite/khoahoc.ejs", { data, date, user ,baiviet});
      }
      return 0;
    } catch (error) {
      return 0;
    }
  }

  static async getnd(req, res) {
    try {
      let user = [];
      let limit = 5;
      if (req.session.user) {
        user = req.session.user;      }
        let id = req.params.id
      const data1 = await lopHocService.getAllOusiteND();
      const moiNhat = await khoaHocService.getByID(id); 
      const baiviet = await baivietService.getNew();
      const data = data1[0];
      if (data.length > 0) {
        res.render("../views/outsite/ndkhoahoc.ejs", { data, date, user,moiNhat,limit,baiviet });
      } else {
        res.render("../views/outsite/ndkhoahoc.ejs", { data, date, user,moiNhat , limit,baiviet});
      }
      return 0;
    } catch (error) {
      return 0;
    }
  }

  static async getndMD(req, res) {
    try {     
      let user = [];
      let limit = 5;
      if (req.session.user) {
        user = req.session.user;      }      
      const data1 = await lopHocService.getAllOusiteND();      
      const moiNhat = await khoaHocService.getByIDMN();    
      const baiviet = await baivietService.getNew();  
      const data = data1[0];
      if (data.length > 0) {
        res.render("../views/outsite/ndkhoahoc.ejs", { data, date, user,moiNhat,limit,baiviet });
      } else {
        res.render("../views/outsite/ndkhoahoc.ejs", { data, date, user,moiNhat , limit,baiviet});
      }
      return 0;
    } catch (error) {
      return 0;
    }
  }

}

module.exports = khoaHocController;
