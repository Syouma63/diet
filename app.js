const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pila',
  // 下記のコードは、Data型が勝手にDatatime型で取得されるのを回避
  dateStrings: 'date'
});

app.use(
  session({
    secret: 'my_secret_key',
    resave: false,
    saveUninitialized: false,
  })
)

app.use((req, res, next) => {
  if (req.session.userId === undefined) {
    res.locals.username = 'ゲスト';
    res.locals.isLoggedIn = false;
  } else {
    res.locals.username = req.session.username;
    res.locals.isLoggedIn = true;
  }
  next();
})



app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/mypage', (req, res) => {
  connection.query(
    'SELECT * FROM records',
    (error, results) => {
      res.render('mypage.ejs', {records: results});
    }
  );
});

app.post('/mypage', (req, res) => {
  connection.query(
    'INSERT INTO records (course_name, score, day) VALUES (?, ?, ?)',
    [req.body.course_name, req.body.score, req.body.day],
    (error, results) => {
      res.redirect('/mypage');
    }
  );
});

app.get('/record', (req,res) => {
  res.render('record.ejs');
});

app.get('/chart', (req,res) => {
  connection.query(
    'SELECT * FROM records',
    (error, results) => {
      res.render('chart.ejs', {records: results});
      const chart = results
      console.log(chart);
      
    }
  )
});

app.post('/delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM records WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/mypage');
    }
  )
  
});

app.get('/edit/:id', (req, res) => {
  connection.query (
    'SELECT * FROM records WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs', {records: results[0]});
    }
  )
});

app.post('/update/:id', (req, res) => {
  connection.query(
    'UPDATE records SET course_name = ?, score = ?, day = ? WHERE id = ? ',
    [req.body.course_name, req.body.score, req.body.day, req.params.id],
    (error, results) => {
      res.redirect('/mypage')
    }
  );
});

app.get('/signup', (req, res) => {
  res.render('signup.ejs', {errors:[]});
});

app.post('/signup',
  (req, res, next) => {
    console.log('入力値の空チェック');
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const errors = [];

    if (username === '') {
      errors.push('ユーザー名が空です');
    }
    if (email === '') {
      errors.push('メールアドレスが空です');
    }
    if (password === '') {
      errors.push('パスワードが空です');
    }
    
    if (errors.length > 0) {
      res.render('signup.ejs', {errors:errors});
    } else {
      next();
    }
  },

  (req, res, next) => {
    console.log('メールのアドレスの重複チェック');
    const email = req.body.email;
    const errors = [];

    connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      (error, results) => {
        if (results.length > 0) {
          errors.push('メールアドレスが重複しています。');
          res.render('signup.ejs', { errors: errors });
        } else {
          next();
        }
      }
    )
  },

  (req, res) => {
    console.log('ユーザー登録');
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, 10, (error, hash) => {
      connection.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hash],
        (error, results) => {
          req.session.userId = results.insertId;
          req.session.username = username;
          res.redirect('/mypage');
        }
      );
    }) 
  }
);

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  connection.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (error, results) => {
      if (results.length > 0) {

        const plain = req.body.password;

        const hash = results[0].password;

        bcrypt.compare(plain, hash, (error, isEqual) => {
          if (isEqual) {
            req.session.userId = results[0].id;
            req.session.username = results[0].username;
            res.redirect('/mypage');
          } else {
            res.redirect('/login');
          }
        });
        
      } else {
        res.redirect('/login');
      }
    }
  )
});

app.get('/logout', (req, res) => {
  req.session.destroy(error => {
    res.redirect('/');
  });
});


app.listen(3000);
console.log('hello');
