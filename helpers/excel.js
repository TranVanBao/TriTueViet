const Excel = require("exceljs");
var dangkyService = require("../apps/services/dangkyService");
var lopHocService = require("../apps/services/lopHocService");
async function exTest(id, res) {
  // let d = new Date();
  // let time = d.getDate() + `` + `` + d.getSeconds();
  // const workbook = new Excel.Workbook();
  // const worksheet = workbook.addWorksheet("My Sheet");

  // worksheet.columns = [
  //   { header: "Stt", key: "stt", width: 10 },
  //   { header: "Tên học viên", key: "tenkhachhang", width: 32 },
  //   { header: "Số điện thoại", key: "sdt", width: 15 },
  //   { header: "email", key: "email", width: 32 },
  //   { header: "Tên lớp học", key: "lophoc", width: 25 },
  //   { header: "Điểm", key: "diem", width: 15 },
  // ];

  const data = await dangkyService.getByIDLop(id);
   const lophoc = await lopHocService.getByID(id);
  let data_return = [];
  let stt = 1;
  for (let item of data) {   
   let mang = {
     stt : stt++,
     tenkhachhang: item.dataValues.tenkhachhang,
     sdt: item.dataValues.sdt,
     email: item.dataValues.email,
     diem: item.dataValues.diem
   }
   
    data_return.push(mang);
  }
 

  let workbook = new Excel.Workbook(); //creating workbook
  let worksheet = workbook.addWorksheet("DANH SÁCH HỌC VIÊN ");
  let font = {
    size: 12,
    bold: true,
    name: "Times New Roman",
  };
  worksheet.getCell(`A1`).value = `DANH SÁCH HỌC VIÊN : `+lophoc[0].tenlophoc;
  worksheet.mergeCells("A1:E1");
  worksheet.getCell(`A1`).font = font;


  //  WorkSheet Header
  worksheet.getRow(2).values = [
    "STT",
    "HỌ VÀ TÊN",   
    "SĐT",  
    "email", 
    "ĐIỂM",
  ];

  worksheet.columns = [
    { key: "stt", width: 7 },
    { key: "tenkhachhang", width: 30 },    
    { key: "sdt", width: 15 },
    { key: "email", width: 30 },     
    { key: "diem", width: 20 },
  ];
  worksheet.getRow(2).font = {
    size: 10,
    bold: true,
    name: "Times New Roman",
  }; 

  worksheet.addRows(data_return);
  res.attachment("danhsachhocvien.xlsx");
  return workbook.xlsx.write(res);
}

module.exports = exTest;
