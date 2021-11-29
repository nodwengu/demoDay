const express = require('express');
const exphbs = require('express-handlebars');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const app = express();

app.use(express.static('public'));


/////////////////////////socket io start/////////////////////////
app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
})
/////////////////////////////////////////////
//////satelize for loaction module set up
// const satelize = require('satelize');

///satelize function----
// satelize.satelize({ip: '197.185.104.215', function(err,payload){
//     console.log(payload);
// }

// });


// import sqlite modules
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');




////-----body parser--

const bodyParser = require('body-parser');
const session = require('express-session');

//starting------


// database start//////////////////////////////////////////


open({
  filename: './securitydb.db',
  driver: sqlite3.Database
}).then(async function (db) {


  // run migrations
  await db.migrate();

  app.post('/add-missing', async function (req, res) {
    console.log("hello");
    console.log(req.body);

    const result = await db.run(
      'INSERT INTO missing (user_name, email, address, ethnicity, lastseen, description, age) VALUES (?, ?, ?, ?, ?, ?, ?)',
      req.body.Name, req.body.Email, req.body.Email, req.body.Gender, req.body.Date, req.body.Message, req.body.Age

    )
    console.log("missing person added")

    res.redirect('missing');

  });

  app.get('/missing',async function (req, res) {
    
    const result = await db.all('SELECT user_name, lastseen, description FROM missing limit 3')
    // const result2 = await db.all('SELECT user_name, description FROM missing')
    
    console.log("result", result)
    res.render('missing',{
      result
    });

  });

// register////////////////////////////





  app.get('/register', function (req, res) {
    // console.log(req.body)
    req.render("locate");
    
  });

  app.post('/register',async function (req, res) {
    console.log(req.body)
    const users = await db.run(
      'INSERT INTO parent (userName, email, homeAddress, mobile, pwd) VALUES (?, ?, ?, ?, ?)',
      req.body.userName, req.body.email, req.body.homeAddress, req.body.mobile, req.body.pwd

    )
    

    res.redirect('play');
    
    
  });






  app.get('/upload', function (req, res) {
    res.render('upload');
  });

  app.get('/locate', function (req, res) {
    res.render('locate');
  });

  



  //contac us page
  app.get('/contus', function (req, res) {
    res.render('contus');
  });


  app.get('/users', function (req, res) {
    res.render("users");
    // res.redirect("/addmemb");
  });

  //----handlebars templates---addmembers page
  app.get('/addmemb', function (req, res) {
    res.render("addmemb");
  });

  //----handlebars2---play page
  app.get('/play',async function (req, res) {
    const users = await db.all('SELECT id, mobile, email FROM parent')
    
    res.render("play");
    // res.redirect("/addmemb");
  });


  //render query
  app.get('/', function (req, res) {
    res.render('login');
  });

  app.post('/login', async function(req,res) {

  //   if (req.body.login == 'true') {
  //     req.session.username = '';
  //     req.session.password = ''; 
  
  //     await db.all('SELECT * FROM login WHERE Email = ? AND Pwd = ?', req.body.username, req.body.password)
  //         .then(function (user_login) {
  //             if (user_login.length != 0) {
  //                 req.session.username = user_login[0].Email;
  //                 req.session.password = user_login[0].Pwd;
  //                 res.redirect('/users');
  //             } else {
  //                 req.session.username = ' ';
  //                 req.session.password = ' ';
  //                 req.session.message = ' ';
  //                 res.redirect('/login');
  //             }
  //         });
  // } else if (req.body.back == 'true') {
  //     res.redirect('/');
  // }
  
  });

  // server.listen(3000, () => {
  //   console.log('listening on *:3000');
  // });

  const PORT = process.env.PORT || 3018;

app.get('/register', (req, res) => {
    res.render('register');
});

const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
}

app.get('/login', (req, res) => {
    res.render('login');
});

  app.listen(PORT, function () {
    console.log(`App started on port ${PORT}`)
  });

})