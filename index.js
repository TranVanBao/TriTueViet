import express from "express";
import config from "dotenv";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";

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

app.use(cors());

var nguoidung = require("./apps/routers/index");
var dangnhap = require("./apps/routers/dangnhapRouter");
//var admin = require('./apps/routers/admin')

var khoahoc = require("./apps/routers/khoaHocRoute");
var dangky = require("./apps/routers/dangKyRoute");
var giangvien = require("./apps/routers/giangVienRoute");
var hocvien = require("./apps/routers/hocVienRoute");
var lophoc = require("./apps/routers/lopHocRoute");
var phonghoc = require("./apps/routers/phongHocRoute");
var phanquyen = require("./apps/routers/phanquyenRoute");
var phanhoi = require("./apps/routers/phanHoiroute");
var taikhoan = require("./apps/routers/taiKhoanroute");

// duong dan tuyet doi
app.set("views", __dirname + "/apps/views");
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
// Router
app.use(nguoidung);
app.use("/dangnhap", dangnhap);
//app.use(admin);
app.use("/admin/khoahoc", khoahoc);
app.use("/admin/dangky", dangky);
app.use("/admin/giangvien", giangvien);
app.use("/admin/hocvien", hocvien);
app.use("/admin/lophoc", lophoc);
app.use("/admin/phonghoc", phonghoc);
app.use("/admin/phanquyen", phanquyen);
app.use("/admin/phanhoi", phanhoi);
app.use("/admin/taikhoan", taikhoan);

///==============ket noi port ====================

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
export default app;
