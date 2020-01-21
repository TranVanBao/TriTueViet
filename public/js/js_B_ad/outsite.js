

window.onload = function () {
  try {
    var url_string = (window.location.href);
    var url = new URL(url_string);
    var kq = url.searchParams.get("kq");
    var mes = url.searchParams.get("mes");
    console.log(kq + " kq " + mes);
    if (kq == 0) {
      toastr.error('Đã xảy ra lỗi, xin bạn hãy thử lại !!!', 'ERROR')
    }
     if (kq == 1) {
      toastr.success('Thành công !!', 'SUCCESS')
    } 
    
  } catch (err) {
    toastr.warning('Cảnh báo lỗi!!!' + err)
  }
}


