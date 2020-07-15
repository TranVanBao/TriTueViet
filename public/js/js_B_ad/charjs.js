// SD admin 
const xlabel = [];
const dem = [];
const xlabelThu = [];
const demThu = [];


char().then((value) => {
  console.log(value);
  // expected output: "foo"
});
charTongthu().then((value) => {
  console.log(value);
  // expected output: "foo"
});


async function getdata() {
  $.ajax({
    url: "/admin/index/thongke",
    method: "get",
    dataType: "json",
    success: await function(response) {
      if (response.msg == "success") {        
        if (          
          response.data == undefined ||
          response.data == null ||
          response.data == ""
        ) {
          alert("Data null");
        } else {      
          $.each(response.data, async function(index, data) {    
             
            let tenlophoc = await data.tenlophoc;
            xlabel.push(tenlophoc);            
            let tong = await Number(response.tong[0][0].tong);
            let d = Number(data.dem);
           await dem.push(Math.floor((d / tong) * 100));          
          });
          return { dem , xlabel}
        }
      }
    },
    error: function(response) {
      alert("server error");
    }
  });
}


async function char() {   
   await getdata() 
  var ctx =  document.getElementById("myChartsvdk").getContext("2d");
  var myChartsvdk = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: xlabel,
      datasets: [
        {
          label: "Sinh viên đăng ký các khóa học(%)",
          data:  dem,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
}

//  char tong thu 
async function charTongthu() {  
 const data= await getdataTongThu()  
  var ctx1 = document.getElementById("myChart1").getContext("2d");
  var myChart1 = new Chart(ctx1, {
    type: 'horizontalBar',
    data: {
      labels:  xlabelThu,
      datasets: [
        {
          label: "Tiền thu từ các khóa học (%)",
          data:  demThu,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
}
async function getdataTongThu() {
  $.ajax({
    url: "/admin/index/thongkeThu",
    method: "get",
    dataType: "json",
    success: await function(response) {
      if (response.msg == "success") {
        if (
          response.data == undefined ||
          response.data == null ||
          response.data == ""
        ) {
          alert("Data null");
        } else {
          $.each(response.data,async function(index, data) {
            let tenlophoc = await data.tenlophoc;
            xlabelThu.push(tenlophoc);
           
            let tong = await Number(response.tong[0][0].tong);
            
            let d = await Number(data.dem);
            demThu.push(Math.floor((d / tong) * 100));  
                  
          });
          return { xlabelThu , demThu}
        }
      }
    },
    error: function(response) {
      alert("server error");
    }
  });
}


