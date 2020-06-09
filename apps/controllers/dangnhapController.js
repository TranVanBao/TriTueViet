var bcrypt = require("bcryptjs")
var fetch = require("node-fetch")
var randomstring = require("randomstring")

var dangnhapService = require("../services/dangnhapService")
var mail = require("../../helpers/nodemailer")

class dangnhapController {
  static async addTK(req, res) {      
    // =captcha==============
    if (!req.body.captcha) {
      return res.json({ success: false, msg: "Please select captcha" });
    }
    // Secret key
    const secretKey = "6LfWmNgUAAAAAByejHVatp1JvpJtRNccgNjzGeSx";
    const verifyURL =
      "https://www.google.com/recaptcha/api/siteverify?secret=" +
      secretKey +
      "&response=" +
      req.body.captcha +
      "&remoteip=" +
      req.connection.remoteAddress;
    // Make a request to verifyURL
    const body = await fetch(verifyURL).then(res => res.json());
    // If not successful
    if (body.success !== undefined && !body.success)
      return res.json({ success: false, msg: "Failed captcha verification" });
    // // If successful
    // // ============end captcha=================
    // tạo mã bí mật
    const token = randomstring.generate(4);
    const kichhoat = false
    const html = `Hi there,
    <br/>
    Cảm ơn bạn đã đăng ký!
    <br/>
    Xin hãy coppy mã và dán vào ô xác nhận để xác nhận email:
    <br/>
    Mã kích hoạt: <b>${token}</b>
    <br/>
    On the following page:
    <a href="http://localhost:3000/dangnhap/dangky/xacnhan/">http://localhost:3000/xacnhan</a>
    <br/><br/>
    Chúc bạn một ngày tốt lành.` 

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.matkhau, salt);
    let { email,tentaikhoan } = { ...req.body };
    let quyenhang = "Học Viên";
    let trangthai = 1;
    if (email.trim().length > 0) {
      let kiemtra = await dangnhapService.getBylogin(email.toLowerCase());
      if (kiemtra.length > 0) {
        //  res.redirect("/?kq=0&mes=Email đã tồn tại");
        res.json({ success: false, msg: "Email đã tồn tại !!" });
      } else {
        let data = { ...req.body, matkhau: hash, quyenhang, trangthai ,token,kichhoat };
        try {        
          const createdTK = await dangnhapService.add(data);
          await mail(email,tentaikhoan,html);
          if (createdTK) {
            //  res.redirect(`/?kq=2&mes=Đăng ký thành công. Xác nhận email để được đăng nhập !`);
            res.json({ success: true, msg: "Xác nhận email để có thể tiếp tục đăng nhập !!" });
          } else {
            //  res.redirect(`/?kq=0&mes=Đã có lỗi xin đăng ký lại !!!`);
            res.json({ success: false, msg: "Không đăng ký thành công !!" });
          }
        } catch (error) {
          return error;
        }
      }
    }
  }

  //  xác nhận email 
  static async xacnhan(req, res) {
    const { token } = req.body;  
    try {
      const updatetk = await dangnhapService.xacNhanEmail(token);
      if (!updatetk) {
        res.redirect(`/?kq=0&mes=Lỗi xác nhận !`);
      } else {
        res.redirect(`/?kq=1&mes=Xác nhận thành công, bạn có thể đăng nhập !`);
      }
    } catch (error) {
      return error;
    }
  }
  static async getxacnhan(req, res) {    
    try {
    res.render("../views/outsite/xacnhanEmail.ejs")
    } catch (error) {
      return error;
    }
  }


  // Kết thức xác nhận 

  static async updatedtk(req, res) {
    const alteredtk = req.body;
    let { quyenhang } = { ...req.body };
    const { id } = req.params;
    if (!Number(id)) {
      console.log("ID Not a Number!!!");
    }
    try {
      const updatetk = await dangnhapService.UpdateTK(id, alteredtk);
      if (!updatetk) {
        res.redirect(`/admin/taikhoan/` + quyenhang + `?kq=0`);
      } else {
        res.redirect(`/admin/taikhoan/` + quyenhang + `?kq=1`);
      }
    } catch (error) {
      return error;
    }
  }

  static async getATk(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      console.log("id not a Number !!!");
    }

    try {
      const thetk = await dangnhapService.getByID(id);

      if (!thetk) {
        res.redirect("/admin/taikhoan");
      } else {
        res.redirect("/admin/taikhoan");
      }
    } catch (error) {
      return error;
    }
  }

  static async getlogin(req, res) {
    const { email, matkhau } = req.body;
    try {
      const thetk = await dangnhapService.getBylogin(email.toLowerCase());
      let user = thetk[0];
      if (thetk == 0) {
        res.redirect("/?kq=0&mes=Email không hợp lệ hoặc chưa được kích hoạt !!!");
      } else {
        switch (thetk[0].trangthai) {
          case 1:
            if (bcrypt.compareSync(matkhau, thetk[0].matkhau)) {
              req.session.user = user;
              switch (user.quyenhang) {
                case "Admin":
                  req.session.user = user;
                  res.redirect("/admin/index?kq=1&mes=Đăng nhập thành công.");                 
                  break;
                case "Nhân Viên":
                  req.session.user = user;
                  res.redirect("/admin/index?kq=1&mes=Nhân viên.");
                  break;
                default:
                  req.session.user = user;
                  res.redirect("/?kq=1&mes=Đăng nhập thành công.");
              }
            }else{
              res.redirect("/?kq=0&mes=Mật khẩu không đúng !");
            }
            break;
          default:
            res.redirect("/?kq=0&mes=Tài khoản của bạn đã bị vô hiệu hóa!!!");
        }
      }
      return error;
    } catch (error) {
      return error;
    }
  }
  // ================lay mat khau moi ==================
  static async laymatkhau(req, res) {   
    try { 
      const email = req.body.email;  
      const kiemtraemail = await dangnhapService.kiemtraemail(email);
      if (kiemtraemail) {
        const matkhaumoi = randomstring.generate(6);       
        const html = `Hi there,
        <br/>
        Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!
        <br/>
        Đây là mật khẩu mới của bạn
        <br/>
        Mật khẩu mới: <b>${matkhaumoi}</b>
        <br/>
        Quay lại trang chủ để đăng nhập nào:
        <a href="http://localhost:3000/">http://localhost:3000/</a>
        <br/><br/>
        Chúc bạn một ngày tốt lành.` 
         await mail(email,email,html);
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(matkhaumoi, salt);
        let matkhau = hash ; 
        const updatetk1 = await dangnhapService.quenmatkhau(email, matkhau); 
        console.log(updatetk1);
        if (!updatetk1) {
          res.redirect(`/?kq=0&mes=Lỗi !`);
        } else {
          res.redirect(`/?kq=1&mes=Xin hãy check email để lấy mật khẩu mới !`);
        }
      } else {
        res.redirect(`/?kq=0&mes=Email chưa được đăng ký !`);
      }
    } catch (error) {
      return error;
    }
  }


}

module.exports = dangnhapController;
