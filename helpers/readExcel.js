var XLSX = require("xlsx");
var fs = require("fs");
var path = require("path");
/* Read test.xlsx from the Documents folder */

async function importExcel(namefile){
var wb = XLSX.readFile(path.join(__dirname+`/upfileExcel/`+namefile))
var sheet_name_list = wb.SheetNames;
var xlData = XLSX.utils.sheet_to_json(wb.Sheets[sheet_name_list[0]])
return xlData
}
module.exports = importExcel