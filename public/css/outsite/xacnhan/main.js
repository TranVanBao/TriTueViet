function validateXacNhanEmail() {
    var token = document.forms["xacnhan"]["token"].value;
      if(token == "" || token == null){
      document.getElementById("err").innerHTML = " Xin nhập mã hợp lệ !!!";
      return false;
    }else{
        document.getElementById("err").innerHTML = "";
    }
   
  }