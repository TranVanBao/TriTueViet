// SD admin
const xlabel = [];
const dem = [];
const xlabelThu = [];
const demThu = [];
const tenlop = [];
const demlop = [];
$(document).ready(function(){
  char().then((value) => {
    // expected output: "foo"
  });
  charTongthu().then((value) => {
    // expected output: "foo"
  });
  lopdcmo_nhieunhat();
});



 

//======================= get data charjs Thống kê sinh viên đăng ký các khóa học
async function getdata(nam, nam1) {
  $.ajax({
    url: `/admin/index/thongke/${nam}/${nam1}`,
    method: "get",
    dataType: "json",
    success: await function (response) {
      if (response.msg == "success") {
        if (
          response.data == undefined ||
          response.data == null ||
          response.data == ""
        ) {
          alert("Data null");
        } else {

          $.each(response.data, async function (index, data) {
            let tenlophoc = await data.tenlophoc;
            xlabel.push(tenlophoc);
            let tong = await Number(response.tong[0][0].tong);
            let d = Number(data.dem);
            await dem.push(Math.floor((d / tong) * 100));
          });
          return { dem, xlabel };
        }
      }
    },
    error: function (response) {
      alert("Lỗi: Thống kê sinh viên đăng ký các khóa học !!");
    },
  });
}
async function char() { 
  
    var n2 = document.getElementById("nam").value; 
    var n1 = document.getElementById("nam1").value; 
    await getdata(n1, n2);
 
 

  var ctx = document.getElementById("myChartsvdk").getContext("2d");
  var myChartsvdk = new Chart(ctx, {
    type: "horizontalBar",
    data: {
      labels: xlabel,
      datasets: [
        {
          label: "Sinh viên đăng ký các khóa học(%)",
          data: dem,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
//=======================end  get data ===========================
//=================  char tong thu== tien thu tu khoa hoc ==================
async function charTongthu() {
  var n2 = document.getElementById("nam").value; 
  var n1 = document.getElementById("nam1").value; 
  const data = await getdataTongThu(n2, n1);

  var ctx1 = document.getElementById("myChart1").getContext("2d");
  var myChart1 = new Chart(ctx1, {
    type: "line",
    data: {
      labels: xlabelThu,
      datasets: [
        {
          label: "Tiền thu từ các khóa học (%)",
          data: demThu,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
async function getdataTongThu(nam, nam1) {
  $.ajax({
    url: `/admin/index/thongkeThu/${nam}/${nam1}`,
    method: "get",
    dataType: "json",
    success: await function (response) {
      if (response.msg == "success") {
        if (
          response.data == undefined ||
          response.data == null ||
          response.data == ""
        ) {
          alert("Dữ liệu trống !!!");
        } else {
          $.each(response.data, async function (index, data) {
            let tenlophoc = await data.tenlophoc;
            xlabelThu.push(tenlophoc);

            let tong = await Number(response.tong[0][0].tong);

            let d = await Number(data.dem);
            demThu.push(Math.floor((d / tong) * 100));
          });
          return { xlabelThu, demThu };
        }
      }
    },
    error: function (response) {
      alert("Lỗi: Tiền thu từ các khóa học !!");
    },
  });
}
//================= end char tong thu ==================
//=====================   thong ke lop dc mo nhieu nhat
//  char tong thu
async function lopdcmo_nhieunhat() {
  var n2 = document.getElementById("nam").value; 
    var n1 = document.getElementById("nam1").value; 
  const data = await getdemsoLop(n2,n1);

  var ctx1 = document.getElementById("myCharkhoahoc").getContext("2d");
  var myCharkhoahoc = new Chart(ctx1, {
    type: "line",
    data: {
      labels: tenlop,
      datasets: [
        {
          label: "Khóa học được mở nhiều nhất (%)",
          data: demlop,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
async function getdemsoLop(nam,nam1) {
  $.ajax({
    url: `/admin/index/demsolop/${nam}/${nam1}`,
    method: "get",
    dataType: "json",
    success: await function (response) {
      if (response.msg == "success") {
        if (
          response.data == undefined ||
          response.data == null ||
          response.data == ""
        ) {
          alert("Data null");
        } else {
          $.each(response.data, async function (index, data) {
            let tenlophoc = await data.tenlophoc;
            tenlop.push(tenlophoc);

            let tong = await Number(response.demlop1[0][0].count);

            let d = await Number(data.dem);
            demlop.push(Math.floor((d / tong) * 100));
          });
          return { tenlop, demlop };
        }
      }
    },
    error: function (response) {
      alert("Lỗi: Khóa học được mở nhiều nhất !!");
    },
  });
}
//=====================end   thong ke lop dc mo nhieu nhat

// ======================done theo ngay=============
$("#layngay").change(function (e) {
  var ngay = document.getElementById("layngay").value;
  thongthemotngay(ngay);
});
// ===
async function thongthemotngay(ngay) {
  $.ajax({
    url: `/admin/index/theongay/${ngay}`,
    method: "get",
    dataType: "json",
    success: await function (response) {
      if (response.msg == "success") {
        if (
          response.sinhvien == undefined ||
          response.sinhvien == null ||
          response.sinhvien == ""
        ) {
          alert("Dữ liệu trống");
        } else {
          let dulieu = response.sinhvien;
          $("#hiendl").html("");
          if (dulieu[0] == undefined || dulieu[0] == null || dulieu[0] == "") {
            alert("Không có sinh viên đăng ký hôm này !!");
          }

          let index = 0;
          dulieu[0].forEach((element) => {
            index++;
            $("#hiendl").append(
              `  <tr>
                    <td class="canhgiua">` +
                index +
                `</td>
                    <td class="canhgiua">` +
                element.tenkhachhang +
                `</td>
                    <td class="canhgiua">` +
                String(element.sdt).replace(/(.)(?=(\d{3})+$)/g, "$1 ") +
                `  </td>
                    <td class="canhgiua">` +
                element.email +
                `  </td>
                    <td class="canhgiua">` +
                element.diachi +
                `  </td>
                    <td class="canhgiua"> ` +
                element.tenlophoc +
                ` </td>
                  </tr>`
            );
          });
        }
      }
    },
    error: function (response) {
      alert("server error");
    },
  });
}
