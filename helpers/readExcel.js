var XLSX = require("xlsx");
/* Read test.xlsx from the Documents folder */
async function readExcel(namefile) {    
  var workbook = XLSX.readFile(`./../public/upfileExcelAmin/` + namefile);
  console.log(workbook)

  var sheet_name_list = workbook.SheetNames[0]
  var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list])
  console.log(xlData);
  return xlData;
} 

module.exports = readExcel;
