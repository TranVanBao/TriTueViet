var dates = require("s-date")


var lopHocService = require("../services/lopHocService")
var khoaHocService = require("../services/khoaHocService")
var giangVienService = require("../services/giangVienService")
var dangkyService = require("../services/dangkyService")
var phongHocService = require("../services/phongHocService")
var excel = require("../../helpers/excel")
var importExcel = require("../../helpers/readExcel")
var mail = require("../../helpers/nodemailer")

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
            dates,
            phonghoc,
            khoahoc,
            giangvien
          });
        } else {
          res.render("../views/admin/lophoc/listlophoc.ejs", {
            data,user,
            dates,
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
            dates,
            khoahoc,
            giangvien
          });
        } else {
          res.render("../views/admin/lophoc/listlophoc.ejs", {
            data, user,
            dates,
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
    const trangthai = 3;
    const id_phong = req.body.id_phonghoc
    const soluonghocvien = req.body.soluonghocvien  
    const phonghoc = await phongHocService.getByID(id_phong);    
    try {
      if(phonghoc[0].soluongnguoi < soluonghocvien ){
        res.redirect("/admin/lophoc/dem/3?kq=0&mes=Số lượng học viên vượt quá mức phòng !")        
      }else{
      const data = { ...req.body, trangthai,soluonghocvien,id_phong }; 
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
    }
      
    } catch (error) {
      return error;
    }
  }

  static async update(req, res) {     
    const thoigianbatdau = req.body.thoigianbatdau; 
    const soluonghocvien = req.body.soluonghocvien  ;   
    const trangthai = req.body.trangthai  ;
    const ttcu = req.body.ttcu  ;
    const  id  = req.params.id; 
    if(ttcu == 1 && trangthai == 2)  {
           //  gui mail cho hoc vien dang ky
     const lophoc = await lopHocService.getByID(id); 
     const sinhvien = await dangkyService.getByIDLop(id);  
     const html = `<b>Xin Thông Báo Lớp Học Bạn Đăng Ký Đã Khai Giảng </b> ,
     <br/>
     Trung tâm xin thông báo bạn đăng kí lớp:   <b>`+lophoc[0].tenlophoc+`</b> <br/>
     Thời gian học: <b> `+lophoc[0].thoigianhoc+` </b><br/>
     Phí dịch vụ:   <b>`+lophoc[0].phidichvu+`</b> <br/>
     Thời lượng học:   <b>`+lophoc[0].thoiluonghoc+`</b> <br/>
     Ngày bắt đầu học:   <b>`+dates('{dd}/{mm}/{yyyy}', lophoc[0].thoigianbatdau)+`</b><br/>
     Địa điểm học: 38 Nguyễn Lâm, phường 6, quận 10, tp HCM  <br/>
     <p class="MsoNormal" style="margin:0in 0in 8pt;line-height:13.91px"><font face="tahoma, sans-serif" size="4" color="#ff0000">*** Vì đây là khóa học ngắn hạn nên trung tâm không chấp nhận hoàn trả học phí vì bất kì lý do gì.</font></p>
     <br/>
     <p class="MsoNormal" style="margin:0in 0in 8pt;color:rgb(80,0,80);line-height:13.91px"><font face="tahoma, sans-serif" size="4" color="#ff0000">Chú ý:</font><font face="tahoma, sans-serif" size="4" color="#000000">&nbsp;Nay lớp đã tới thời gian học mong bạn sẽ đến trung tâm học đầy đủ để không bị mất bài ảnh hưởng đến quá trình học.</font></p> <br/>
     Cám ơn bạn đã quan tâm các khóa học tại trung tâm <b>Trí Tuệ Việt</b> <br/>
   Thanks & Best Regards!  <br/>
   <font size="4" face="georgia, serif" color="#000000"><b>Trung Tâm Đào Tạo Tin Học Trí Tuệ Việt</b></font>  <br/>
   <font size="4" color="#000000" face="arial narrow, sans-serif"><b>38 Nguyễn Lâm, phường 6, quận 10, tp HCM</b></font> <br/>
   Website: <a href="http://localhost:3000/">http://localhost:3000/</a><br/>
   Email:tranvanbaocntt1@gmail.com            
     <br/><br/>
     Chúc bạn một ngày tốt lành.` 
     sinhvien.forEach(dl => { 
      mail(dl.email,dl.tenkhachhang, html); 
     });
    

 // ket thuc phan gui mai
    }
    const id_phong = req.body.id_phonghoc
    const altered = {...req.body,thoigianbatdau };    
    const phonghoc = await phongHocService.getByID(id_phong); 
   
    try {    
      if(phonghoc[0].soluongnguoi < soluonghocvien ){
        res.redirect(`/admin/lophoc/dem/`+trangthai+`?kq=0&mes=Số lượng học viên vượt quá mức phòng !`)        
      }else {  
      const update = await lopHocService.Update(id, altered);  
      if (update == null ) {
        res.redirect(`/admin/lophoc/dem/`+trangthai+`?kq=0&mes=Cập nhật không thành công !!!`);
      } else {       
        res.redirect(`/admin/lophoc/dem/`+trangthai+`?kq=1&mes=Thành công !`);
      }
    }      
    } catch (error) {
      return error;
    }
  }

 


  static async getAllhocvien(req, res) {
    if (req.session.user && (req.session.user.quyenhang == "Admin" || req.session.user.quyenhang == "Nhân Viên")) {
      try {
        const user = req.session.user
        const { id } = req.params;
        const data = await dangkyService.getByIDLop(id);
         

        const lophoc = await lopHocService.getByID(id); 
        if (data.length > 0) {
          res.render("../views/admin/dangky/listdangky.ejs", {
            data, user,
            dates,
            lophoc
          });
        } else {
          res.render("../views/admin/dangky/listdangky.ejs", {
            data, user,
            lophoc,
            dates,
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
    if (req.session.user.quyenhang == "Admin" || req.session.user.quyenhang == "Nhân Viên") {
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
