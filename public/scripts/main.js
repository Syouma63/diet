// swiper

const mySwiper = new Swiper('.swiper-container', {
  loop: false,
  effect: 'fade',
  centeredSlides: true,
  slidesPerView: 1,
  speed: 1000,
  // autoplay: {
  //   delay: 5000,
  //   disableOnInteraction: false,
  // }
});


var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // 作成するグラフの種類
    type: 'line',

    // ラベルとデータセットを設定
    data: {
        labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
        datasets: [{
            label: "My First dataset",
            // backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [68.7, 67.9, 68.5, 67.6, 67, 67.4, 66,8],
        }]
    },

    // オプション設定
    options: {
      // 軸指定
      scales: { 
        // Y軸設定 
        yAxes: [
          {
            // 目盛り
            ticks: {
              min: 60,
              max: 80,
              stepSize: 5
              
            }
          }
        ]
      }
    }
});
