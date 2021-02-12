// グラフ

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // 作成するグラフの種類
    type: 'line',

    // ラベルとデータセットを設定
    data: {
      labels: ['8/1', '8/2', '8/3', '8/4', '8/5', '8/6', '8/7', '8/8', '8/9', '8/10', '8/11', '8/12', '8/13', '8/14','8/15', '8/16', '8/17', '8/18', '8/19', '8/20', '8/21','8/22', '8/23', '8/24', '8/25', '8/26', '8/27', '8/28', '8/29', '8/30', '8/31'],
        datasets: [{
            label: "体重（kg）",
            // backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [68.7, 67.9, 68.5, 67.6, 67, 67.4, 66.8, 68.7, 67.9, 67.5, 67.6, 67, 67.4, 66.8, 68.7, 67.9, 68.5, 67.6, 67, 67.4, 66.8, 68.7, 67.9, 68.5, 67.6, 67, 67.4, 66.8, 67, 67.4, 66,8],
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
              min: 50,
              msuggestedMax: 80,
              stepSize: 5,
              callback: function(value, index, values){
                return  value +  'kg'
              }
            }
          }
        ]
      }
    }
});
