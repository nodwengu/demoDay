const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3018;
app.use(express.static('public'));

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
app.get('/users', function(req,res){
res.render('users', users);
});

//----handlebars templates
app.get('/', function(req,res){
    res.render("users");
    });



/////--------------------
app.listen(PORT, function () {
    console.log(`App started on port ${PORT}`)
});