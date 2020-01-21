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
  console.log(document.getElementById("password1"));
  if (
    document.getElementById("password1").value ==  document.getElementById("confirm1").value
  ) {
    document.getElementById("submit").disabled = false;
  } else {
    document.getElementById("submit").disabled = true;
  }
}
