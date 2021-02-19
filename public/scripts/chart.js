
// グラフ

var ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
    // 作成するグラフの種類
    type: 'bar',

    // ラベルとデータセットを設定
    data: {
      labels: ['8/1', '8/8', '8/9', '8/13', '8/16', '8/19'],
        datasets: [{
          label: "スコア",
          // backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: [122, 122, 122, 122, 122, 122],
          backgroundColor: "rgba(219,39,91,0.5)"
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
              msuggestedMin: 50,
              msuggestedMax: 120,
              stepSize: 5,
              callback: function(value, index, values){
                // return  value +  'kg'
                return value
              }
            }
          }
        ]
      }
    }
});
