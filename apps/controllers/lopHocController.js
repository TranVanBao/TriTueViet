var date = require("s-date")


var lopHocService = require("../services/lopHocService")
var khoaHocService = require("../services/khoaHocService")
var giangVienService = require("../services/giangVienService")
var dangkyService = require("../services/dangkyService")
var phongHocService = require("../services/phongHocService")
var excel = require("../../helpers/excel")
var importExcel = require("../../helpers/readExcel")


// trang thai 0 hoàn thành , 1 sáp khai giảng , 2 đang học , 3 đang chờ
class lophocController {
  static async getAll(req, res) {
    if (req.session.user.quyenhang == "Admin" || req.session.user.quyenhang == "Nhân Viên") {
      try {
        const user = req.session.user
        let trangthai = 1;
        const data1 = await lopHocService.getAll(trangthai); 
        const khoahoc = await khoaHocService.getKH();
        const phonghoc = await phongHocService.getsudung();
        const giangvien = await giangVienService.getcolam();
        const data = data1[0]; 
        if (data.length > 0) {
          res.render("../views/admin/lophoc/listlophoc.ejs", {
            data,user,
            trangthai,
            date,
            phonghoc,
            khoahoc,
            giangvien
          });
        } else {
          res.render("../views/admin/lophoc/listlophoc.ejs", {
            data,user,
            date,
            trangthai,
            khoahoc,
            giangvien,
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
  static async get1lop(req, res) {
    if (req.session.user.quyenhang == "Admin" || req.session.user.quyenhang == "Nhân Viên") {
      try {
        const user = req.session.user
        let trangthai = req.params.trangthai;
        const data1 = await lopHocService.get1lop(trangthai);
        const khoahoc = await khoaHocService.getAll();
        const phonghoc = await phongHocService.getsudung();
        const giangvien = await giangVienService.getcolam();
        const data = data1[0];
        if (data.length > 0) {         
          res.render("../views/admin/lophoc/listlophoc.ejs", {
            data, user,
            phonghoc,
            trangthai,
            date,
            khoahoc,
            giangvien
          });
        } else {
          res.render("../views/admin/lophoc/listlophoc.ejs", {
            data, user,
            date,
            phonghoc,
            trangthai,
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

  static async Delete(req, res) {
    if (req.session.user.quyenhang == "Admin" || req.session.user.quyenhang == "Nhân Viên") {
      let { id } = req.params;
      if (!Number(id)) {
        console.log("ID not Number !!!");
        res.redirect("/admin/lophoc");
      }
      try {
        let Xoa = await lopHocService.delete(id);
        if (Xoa) {
          res.status(204).redirect("/admin/lophoc");
        } else {
          res.redirect("/admin/lophoc");
        }
        return;
      } catch (error) {
        return error;
      }
    } else {
      return res.redirect("/");
    }
  }

  static async add(req, res) {
    let trangthai = 3;
    let data = { ...req.body, trangthai };

    try {
      const created = await lopHocService.add(data);     
      switch(created) {
        case 0:
          res.redirect("/admin/lophoc/dem/3?kq=0&mes=Bị trùng lớp !")
          break;
        case 1:
          res.redirect("/admin/lophoc/dem/3?kq=0&mes=Không thêm được !")
          break;
        default:
          res.redirect("/admin/lophoc/dem/3?kq=1&mes=Thêm thành công !")
      }
      
    } catch (error) {
      return error;
    }
  }

  static async update(req, res) {
    const altered = {...req.body };
    console.log(altered);
    const  id  = req.params.id; 
    try {      
      const update = await lopHocService.Update(id, altered);    console.log(update + '123123123123213');  
      if (!update) {
        res.redirect("/admin/lophoc?kq=0&mes=Cập nhật không thành công !!!");
      } else {
       
        res.redirect("/admin/lophoc?kq=1&mes=Thành công !");
      }
      return;
    } catch (error) {
      return error;
    }
  }

  static async getAllhocvien(req, res) {
    if (req.session.user.quyenhang == "Admin" || req.session.user.quyenhang == "Nhân Viên") {
      try {
        const user = req.session.user
        const { id } = req.params;
        const data = await dangkyService.getByIDLop(id);
        //  console.log(data);

        const lophoc = await lopHocService.getByID(id);
        if (data.length > 0) {
          res.render("../views/admin/dangky/listdangky.ejs", {
            data, user,
            date,
            lophoc
          });
        } else {
          res.render("../views/admin/dangky/listdangky.ejs", {
            data, user,
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
  static async getExportExl(req, res) {
    if (req.session.user.quyenhang == "Admin" || req.session.user.quyenhang == "Nhân Viên") {
      try {        
        
        const user = req.session.user
        const  id  = req.params.id;       
       var exp = await  excel(id);        
       if(exp == 1)  {
        res.redirect(`/admin/lophoc/hocvien/`+id+`?kq=1&mes=Thành công !`);

       }  else{
        res.redirect(`/admin/lophoc/hocvien/`+id+`?kq=0&mes=Thất bại !`);
       }
          
       
      } catch (error) {
        return error;
      }
    } else {
      return res.redirect("/");
    }
  }

  static async getImport(req, res) {
    if (req.session.user.quyenhang == "Admin" || req.session.user.quyenhang == "Nhân Viên") {
      try {        
        if(req.file){     
        var namefile =   req.file.originalname        
        var data = await importExcel(namefile) 
        const  id  = req.params.id;             
        for (let index = 1; index < data.length; index++) {
          const element = data[index];  
          const email = element.__EMPTY_3
          const diem = element.__EMPTY_5         
          const  updateDiem = await  dangkyService.UpdateDiem(email,diem) 
                   
        }     
        res.redirect(`/admin/lophoc/hocvien/`+id+`?kq=1&mes=Thành công !`);
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
