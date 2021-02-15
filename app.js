const express = require('express');
const mysql = require('mysql')
const session = require('express-session')
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pila'
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});

app.use(
  session({
    secret: 'my_secret_key',
    resave: false,
    saveUninitialized: false,
  })
)



app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/mypage', (req, res) => {
  if (req.session.userId === undefined) {
    console.log('ログインしていません');
  } else {
    console.log('ログインしています');
  }
  res.render('mypage.ejs');
});

app.get('/chart', (req,res) => {
  res.render('chart.ejs');
});

app.get('/record', (req,res) => {
  res.render('record.ejs');
});

app.get('/signup', (req, res) => {
  res.render('signup.ejs');
});

app.post('/signup', (req, res) => {
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password

  connection.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password],
    (error, results) => {
      res.redirect('/mypage');
    }
  );
})

app.get('/login', (req, res) => {
  connection.query(
    res.render('login.ejs')
  )
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  connection.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (error, results) => {
      if (results.length > 0) {
        if (req.body.password === results[0].password) {
          req.session.userId = results[0].id;
          res.redirect('/mypage');
        } else {
          res.redirect('/login');
        }
      } else {
        res.redirect('/login');
      }
    }
  )
});




app.listen(3000);
console.log('hello');
