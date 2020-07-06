const multer = require("multer");
// let d = new Date();
// d.getDate();
// d.getMonth();
// d.getFullYear();
// let n =  d.getDate()+ d.getMonth()+ d.getFullYear()
// luu duong dan hinh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upfileExcelAmin");
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname);
  }
});

// check image upload

function checkfile(req, file, cb) {
  if (!file.originalname.match(/\.(xlsx|csv)$/)) {
    cb(new Error("Đây không phải là file excel , csv , vui lòng chọn lại!"));
  } else {
    cb(null, true);
  }
}

var upload = multer({ storage: storage, fileFilter: checkfile });
//const single = upload.single('file')

// const single = upload.single("file", (req, res) => {
//   if (err) return res.send({ error: err.message });
//   return res.send({ avatar: req.file });
// });
//========================================
module.exports = upload;
