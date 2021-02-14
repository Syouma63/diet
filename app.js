const express = require('express');


const app = express();


app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/mypage', (req, res) => {
  res.render('mypage.ejs');
});

app.get('/chart', (req,res) => {
  res.render('chart.ejs');
});



app.listen(3000);
console.log('hello');
