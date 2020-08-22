
window.onload = function () {
  try {    
toastr.options = {  
  "positionClass": "toast-bottom-right"
}
    var url_string = (window.location.href);
    var url = new URL(url_string);
    var kq = url.searchParams.get("kq");
    var mes = url.searchParams.get("mes");  
    var nam = url.searchParams.get("nam");
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


//  hien hinh anh khoa hoc
function readURL1(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $("#profile-img-tag").attr("src", e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}
$("#profile-img").change(function() {
  readURL1(this);
});

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $("#blah").attr("src", e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

$("#imgInp").change(function() {
  readURL(this);
});

// confimr password
function check_pass() {
  console.log(document.getElementById("password"));
  if (
    document.getElementById("password").value ==  document.getElementById("confirm").value
  ) {
    document.getElementById("submit").disabled = false;
  } else {
    document.getElementById("submit").disabled = true;
  }
}


// Thong ke 

document.getElementById("lophoc").onclick = function () {
  document.getElementById("tklh").style.display = 'block';
  document.getElementById("tkthu").style.display = 'none'; 
};

document.getElementById("thuchi").onclick = function () {    
  document.getElementById("tklh").style.display = 'none';
  document.getElementById("tkthu").style.display = 'block';
};

