

window.onload = function () {
  try {    
toastr.options = {  
  "positionClass": "toast-bottom-right"
}
    var url_string = (window.location.href);
    var url = new URL(url_string);
    var kq = url.searchParams.get("kq");
    var mes = url.searchParams.get("mes");
    console.log(kq + " kq " + mes);
    if (kq == 0) {
      toastr.error(mes, 'ERROR')
    }
     if (kq == 1) {
      toastr.success(mes, 'SUCCESS')
    } 
    if (kq == 2) {
      toastr.warning(mes, 'WARNING')
    } 
    
  } catch (err) {
    toastr.warning('Cảnh báo lỗi!!!' + err)
  }
}


//  ==== validate form  tao bai viet 
function validateTaoBV() {
  var tieude = document.forms["taobv"]["tieude"].value;
  var id_khoahoc = document.forms["taobv"]["id_khoahoc"].value;
  var noidung = document.forms["taobv"]["noidung"].value;
  console.log(noidung+'123123');  
  if(tieude == "" || tieude.length < 5){
    document.getElementById("demo").innerHTML = " Không được để trống , dữ liệu phải trên 5 kí tự !!!";
    return false;
  }
  if(id_khoahoc == "" || isNaN(id_khoahoc)){
    document.getElementById("demo1").innerHTML = " Xin chọn 1 khóa học !!!";
    return false;
  }
  if(noidung == "" ){
    document.getElementById("demo2").innerHTML = " Xin điền nội dung !!!";
    return false;
  }else{
    document.getElementById("demo2").innerHTML = "";
  }
}

// ========== validate tra loi comment
function validateTraLoiCM() {
  var noidung = document.forms["traloibv"]["noidungtraloi"].value; 
  if(noidung == "" ){
     document.getElementById("noidungtl").innerHTML = " Xin điền nội dung !!!";
    return false;
  }
}

// function validateReLy() {
//   var noidung = document.forms["traloi"]["noidungtraloi"].value; 
//   if(noidung == "" || isNaN(noidung)){
//      document.getElementById("noidungtl1").innerHTML = " Xin điền nội dung !!!";
//     return false;
//   }
// }

//  === Validate đăng ký học outsite
function validateDKhoc() {
  var tenkhachhang = document.forms["dangkyhocoutsite"]["tenkhachhang"].value;
  var sdt = document.forms["dangkyhocoutsite"]["sdt"].value;
  var id_lophoc = document.forms["dangkyhocoutsite"]["id_lophoc"].value;
  var email = document.forms["dangkyhocoutsite"]["email"].value;
  if(tenkhachhang == "" || tenkhachhang.length < 5){
    document.getElementById("dk1").innerHTML = " Không được để trống , dữ liệu phải trên 5 kí tự !!!";
    return false;
  }else{
    document.getElementById("dk1").innerHTML = "";    
  } 
  if(sdt == "" || Number.isNaN(sdt) || sdt.length < 9 || sdt.length > 12){
    document.getElementById("dk3").innerHTML = " Xin điền số điện thoại hợp lệ của bạn !!!";
    return false;
  }else{
    document.getElementById("dk3").innerHTML = "";    
  }

  if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ){
    document.getElementById("dk4").innerHTML = "";    
  }else{
    document.getElementById("dk4").innerHTML = " Xin điền nội dung email !!!";
    return false;
  }
  if(id_lophoc == "" || isNaN(id_lophoc)){
    document.getElementById("dk2").innerHTML = " Xin chọn 1 khóa học !!!";
    return false;
  }else{
    document.getElementById("dk2").innerHTML = "";
  }
}
