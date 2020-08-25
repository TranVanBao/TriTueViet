var express = require("express");
var config = require("dotenv");
var bodyParser = require("body-parser");
var flash = require("express-flash");
var session = require("express-session");
var cors = require("cors");
var cookieParser = require('cookie-parser')
const app = express();

config.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('trust proxy', 1)
app.use(
  session({
    secret: "bimatkhongthebatmy",
    resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
  })
);

app.use(cookieParser());
app.use(cors());
app.use(flash());
// =========outsite==================
var nguoidung = require("./apps/routers/index");
var dangnhap = require("./apps/routers/dangnhapRouter");
var index = require("./apps/routers/outsite/indexOutsiteR");
var forum = require('./apps/routers/outsite/forumsRoute')
var register = require('./apps/routers/outsite/dangKyOusiteR')
var course = require('./apps/routers/outsite/khoaHocOusite')
var canhanOutsite = require("./apps/routers/outsite/taikhoancanhanOutR");
var baiviet = require("./apps/routers/outsite/baivietOutRouter");
// =============admin=====================
var Admin = require("./apps/routers/AdminRouter");
var canhan = require("./apps/routers/taikhoancanhanroute");
var khoahoc = require("./apps/routers/khoaHocRoute");
var dangky = require("./apps/routers/dangKyRoute");
var thutien = require("./apps/routers/thutienRoute");
var giangvien = require("./apps/routers/giangVienRoute");
var hocvien = require("./apps/routers/hocVienRoute");
var lophoc = require("./apps/routers/lopHocRoute");
var phonghoc = require("./apps/routers/phongHocRoute");
var phanquyen = require("./apps/routers/phanquyenRoute");
var diendan = require("./apps/routers/dienDanroute");
var taikhoan = require("./apps/routers/taiKhoanroute");
var thoikhoabieu = require("./apps/routers/thoiKhoaBieuRoute");
var AbaiViet = require("./apps/routers/baiVietRouter");
var Achuyenmuc = require("./apps/routers/chuyenmucRouter");

// duong dan tuyet doi
app.set("views", __dirname + "/apps/views");
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
// Router
app.use(nguoidung);
app.use("/dangnhap", dangnhap);
app.use( index);
app.use("/forum", forum);
app.use("/baiviet", baiviet);
app.use(register);
app.use("/course", course);
app.use("/taikhoan/", canhanOutsite);
//app.use(admin);
app.use("/admin/index", Admin);
app.use("/admin/khoahoc", khoahoc);
app.use("/admin/dangky", dangky);
app.use("/admin/thutien", thutien);
app.use("/admin/giangvien", giangvien);
app.use("/admin/hocvien", hocvien);
app.use("/admin/lophoc", lophoc);
app.use("/admin/phonghoc", phonghoc);
app.use("/admin/phanquyen", phanquyen);
app.use("/admin/diendan", diendan);
app.use("/admin/taikhoan", taikhoan);
app.use("/admin/canhan", canhan);
app.use("/admin/thoikhoabieu", thoikhoabieu);
app.use("/admin/baiviet", AbaiViet);
app.use("/admin/chuyenmuc", Achuyenmuc);

///==============ket noi port ====================

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
module.exports = app;
