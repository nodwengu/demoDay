const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3018;
app.use(express.static('public'));


//////satelize for loaction module set up
const satelize = require("satelize");

///satelize function----
satelize.satelize({ip: '197.185.104.215', function(err,payload){
    console.log(payload);
}

});


// import sqlite modules
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const users = [];
// database setup starts here
open({
    filename: './data.db',
    driver: sqlite3.Database
})

// image uploading middleware
const path = require('path')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'pics')
    },
    filename: (req, File, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})


const upload = multer({ storage: storage })

app.post('/upload', upload.single("image"), (req, res) => {

    res.send(`upload`);
});

app.get('/upload', function (req, res) {
    res.render('upload');
});

////-----body parser--

const bodyParser = require('body-parser');
const session = require('express-session');




//starting------

app.get('/info', function (req, res) {
    res.send(`please add, ${req.body.user1} ${req.body.user2}`);
});
//userName and details
app.post('/info', function (req, res) {
    console.log(req.body);
    res.send(`Hello, ${req.body.FirstName} ${req.body.lastName}`);
});
//family members capturing
app.post('/membz', function (req, res) {
    console.log(req.body);
    res.send(`Hello, ${req.body.FirstName} ${req.body.lastName}
    ${req.body.age} ${req.body.race} ${req.body.main - address}
    `);
});

//render query
app.get('/users', function (req, res) {
    res.render('users', users);
});

//render query
app.get('/', function (req, res) {
    res.render('users', users);
});


//handlebar--login
app.get('/login', function (req, res) {
    res.render('login');
});



//----handlebars2---userspage
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




/////--------------------
app.listen(PORT, function () {
    console.log(`App started on port ${PORT}`)
});