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

