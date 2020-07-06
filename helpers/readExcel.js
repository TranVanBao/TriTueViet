var XLSX = require('xlsx')

async function readExcel(namefile){
console.log(namefile + 'da vao read file excel');
console.log(`../public/upfileExcelAmin/`+ namefile);
     

var workbook =  XLSX.readFile('./../public/upfileExcelAmin/1.xlsx');   
console.log(workbook);
//var sheet_name_list = await workbook.SheetNames;
console.log(namefile);
console.log(sheet_name_list);
var xlData = await XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
console.log(namefile);
console.log(xlData);
return xlData
}

module.exports = readExcel;