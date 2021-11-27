const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

app.use(express.static('public'));


/////////////////////////socket io start/////////////////////////

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
    filename: './DB/securitydb.db',
    driver: sqlite3.Database
  }).then(async function (db) {
      

    // run migrations
    // await db.migrate();

app.get('/upload', function (req, res) {
    res.render('upload');
});

app.get('/locate', function (req, res) {
    res.render('locate');
});


// missing people reports

app.get('/missing', function (req, res) {
  res.render('missing');
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
app.get('/play', function (req, res) {
  res.render("play");
  // res.redirect("/addmemb");
});


//render query
app.get('/', function (req, res) {
  res.render('login');
});

// server.listen(3000, () => {
//   console.log('listening on *:3000');
// });

const PORT = process.env.PORT || 3018;

app.listen(PORT, function () {
  console.log(`App started on port ${PORT}`)
});

})