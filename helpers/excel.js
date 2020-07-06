const Excel = require("exceljs");
var dangkyService = require("../apps/services/dangkyService");

async function exTest(id) {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("My Sheet");

  worksheet.columns = [
    { header: "Stt", key: "stt", width: 10 },
    { header: "Tên học viên", key: "tenkhachhang", width: 32 },
    { header: "Số điện thoại", key: "sdt", width: 15 },
    { header: "Email", key: "email", width: 15 },
  ];

  const data = await dangkyService.getByIDLop(id);

  let stt = 0;
  data.forEach((dl) => {
    stt++;
    worksheet.addRow({
      lophoc: dl.id_lophoc,
      stt: stt,
      tenkhachhang: dl.tenkhachhang,
      sdt: `0` + dl.sdt,
      email: dl.email,
    });
  });

  // save under export.xlsx
  await workbook.xlsx.writeFile(`export_` + time + `.xlsx`);

  //load a copy of export.xlsx
  const newWorkbook = new Excel.Workbook();
  await newWorkbook.xlsx.readFile("export.xlsx");

  const newworksheet = newWorkbook.getWorksheet("My Sheet");
  newworksheet.columns = [
   
    { header: "Stt", key: "stt", width: 10 },
    { header: "Tên học viên", key: "tenkhachhang", width: 32 },
    { header: "Số điện thoại", key: "sdt", width: 15 },
    { header: "Email", key: "email", width: 32 },
    { header: "Tên lớp học", key: "lophoc", width: 25 },
  ];
  await newworksheet.addRow({
    id: 3,
    name: "New Guy",
    dob: new Date(2000, 1, 1),
  });

  let d = new Date();
  let time = d.getDate() + `` + `` + d.getSeconds();
  console.log(time);

  await newWorkbook.xlsx.writeFile(`D:\\export2` + time + `.xlsx`);

  console.log("Thành công");
}

module.exports = exTest;
