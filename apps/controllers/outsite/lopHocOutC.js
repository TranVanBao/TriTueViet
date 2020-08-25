var date = require("s-date")
var lopHocService = require("../../services/lopHocService")
var khoaHocService = require("../../services/khoaHocService")
var giangVienService = require("../../services/giangVienService")
var dangkyService = require("../../services/dangkyService")
var baivietService = require("../../services/baivietService")
var excel = require("../../../helpers/excel")
var importExcel = require("../../../helpers/readExcel")
class lophocController {
  static async getAll(req, res) {
    if ((req.session.user.quyenhang = "Giảng Viên")) {
      try {
       
        let user = [];
        let id_tk
        if (req.session.user) { 
          user = req.session.user;
           id_tk = req.session.user.id;
        }
        console.log(id_tk);
        let trangthai = req.params.trangthai;
        const data1 = await lopHocService.getGVOut(trangthai,id_tk);
        console.log(data1);
        const baiviet = await baivietService.getNew();
        const data = data1[0];
        if (data.length > 0) {
          res.render("../views/outsite/trangcanhan/listlophocOut.ejs", {
            data,baiviet,trangthai,
            user,
            date
          });
        } else {
          res.render("../views/outsite/trangcanhan/listlophocOut.ejs", {
            data,baiviet,trangthai,
            date,
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
  static async get1lop(req, res) {
    if ((req.session.user.quyenhang = "Giảng Viên")) {
      try {
        let trangthai = req.params.trangthai;
        const data1 = await lopHocService.get1lop(trangthai);
        const khoahoc = await khoaHocService.getAll();
        const giangvien = await giangVienService.getAll();
        const baiviet = await baivietService.getNew();
        const data = data1[0];
        if (data.length > 0) {
          res.render("../views/outsite/trangcanhan/listlophocOut.ejs", {
            data,baiviet,
            date,
            khoahoc,
            giangvien
          });
        } else {
          res.render("../views/outsite/trangcanhan/listlophocOut.ejs", {
            data,baiviet,
            date,
            khoahoc,
            giangvien,
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

  static async getAllhocvien(req, res) {
    if ((req.session.user.quyenhang = "Giảng Viên")) {
      try {
        let user = [];
        if (req.session.user) {
          user = req.session.user;
        }
        const { id } = req.params;
        const data = await dangkyService.getByIDLop(id);
        const lophoc = await lopHocService.getByID(id);
        const baiviet = await baivietService.getNew();
        if (data.length > 0) {
          res.render("../views/outsite/trangcanhan/listdangkyOut.ejs", {
            data,
            user,baiviet,
            date,
            lophoc
          });
        } else {
          res.render("../views/outsite/trangcanhan/listdangkyOut.ejs", {
            data,
            user,baiviet,
            lophoc,
            date,
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
    let {id_lophoc} =  await { ...req.body };
    let altered = await { ...req.body };
    const { id } = req.params; console.log(id); console.log(altered);
    try { 
      const update = await dangkyService.Update(id, altered);
      if (!update) {
        res.redirect(`/taikhoan/hocvien/`+id_lophoc+`?kq=0&mes=Thất bại !`);
      } else {
        res.redirect(`/taikhoan/hocvien/`+id_lophoc+`?kq=1&mes=Thành công !`);
      }
      res.redirect(`/taikhoan/hocvien/`+id_lophoc+`?kq=0&mes=Có lỗi !`);
    } catch (error) {
      return error;
    }
  }

  static async getExportExl(req, res) {
    if (req.session.user.quyenhang == "Admin" || req.session.user.quyenhang == "Nhân Viên" || req.session.user.quyenhang == "Giảng Viên") {
      try {    
       
      
        const  id  = req.params.id;
         await excel(id,res);         
  
          
       
      } catch (error) {
        return error;
      }
    } else {
      return res.redirect("/");
    }
  }

  static async getImport(req, res) {
    if (req.session.user.quyenhang == "Admin" || req.session.user.quyenhang == "Nhân Viên" || req.session.user.quyenhang == "Giảng Viên") {
      try {        
        if(req.file){     
        var namefile =   req.file.originalname     
        let diem = 0   
        var data = await importExcel(namefile) 
        const  id  = req.params.id;             
        for (let index = 1; index < data.length; index++) { 
          const element = data[index];  
          const email = element.__EMPTY_2
          if(element.__EMPTY_3){
           diem = element.__EMPTY_3   
          }      
          const  updateDiem = await  dangkyService.UpdateDiem(email,id,diem) 
                   
        }     
        res.redirect(`/taikhoan/hocvien/`+id+`?kq=1&mes=Thành công !`);
       }
       
      } catch (error) {
        return error;
      }
    } else {
      return res.redirect("/");
    }
  }
}

module.exports = lophocController;
