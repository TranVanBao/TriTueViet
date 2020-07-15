const Excel = require("exceljs");
var dangkyService = require("../apps/services/dangkyService");
var lopHocService = require("../apps/services/lopHocService");
async function exTest(id) {
  let d = new Date();
  let time = d.getDate() + `` + `` + d.getSeconds();
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("My Sheet");
  

  worksheet.columns = [
    { header: "Stt", key: "stt", width: 10 },
    { header: "Tên học viên", key: "tenkhachhang", width: 32 },
    { header: "Số điện thoại", key: "sdt", width: 15 },
    { header: "email", key: "email", width: 32 },
    { header: "Tên lớp học", key: "lophoc", width: 25 },
    { header: "Điểm", key: "diem", width: 15 },
  ];

  const data = await dangkyService.getByIDLop(id);
  const lophoc = await lopHocService.getByID(13);

  let stt = 0;
  data.forEach((dl) => {
    stt++;

    worksheet.addRow({
      lophoc: lophoc[0].tenlophoc,
      stt: stt,
      tenkhachhang: dl.tenkhachhang,
      sdt: `0` + dl.sdt,
      email: dl.email,
    });
  });

  // save under export.xlsx
  await workbook.xlsx.writeFile("export.xlsx")
  

  //load a copy of export.xlsx
  const newWorkbook = new Excel.Workbook();
  await newWorkbook.xlsx.readFile("export.xlsx");

  const newworksheet = newWorkbook.getWorksheet("My Sheet");
  newworksheet.columns = [
    { header: "Stt", key: "stt", width: 10 },
    { header: "Tên học viên", key: "tenkhachhang", width: 32 },
    { header: "Số điện thoại", key: "sdt", width: 15 },
    { header: "email", key: "email", width: 32 },
    { header: "Tên lớp học", key: "lophoc", width: 25 },
    { header: "Điểm", key: "diem", width: 15 },
  ];

  var kq = await newWorkbook.xlsx.writeFile(`D:\\export2` + time + `.xlsx`);

  return 1;
}

module.exports = exTest;
