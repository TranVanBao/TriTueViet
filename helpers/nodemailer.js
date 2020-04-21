import nodemailer from "nodemailer"

 function mail(email,tenkhachhang, noidung){  
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tranvanbaocntt1@gmail.com',
      pass: 'tranvanbaocntt1@gmail'
    }
  });  
  // send mail with defined transport object
  let mailOptions = {
    from: '"Trung Tâm Tin Học Trí Nguyễn 👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: 'Xin chào ' + tenkhachhang,
    text: '',
    html: noidung
  };  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = mail