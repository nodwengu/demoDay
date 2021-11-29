const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const PORT = process.env.PORT || 3018;
app.use(express.static('public'));


/////////////////////////socket io start/////////////////////////




const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});



io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});

////emiting
io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

//send to all mesaging//////////////////////

io.on('connection', (socket) => {
  socket.broadcast.emit('hi');
});

///////////////////////////////////////////////////////
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

///////////////////////////////////////////////////////
server.listen(3000, () => {
  console.log('listening on *:3000');
});





  

///////   //////////end setup for socket .io///////////////////////




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

const users = [];
// database setup starts here
open({
    filename: './data.db',
    driver: sqlite3.Database
})




const upload = multer({ storage: storage })

app.post('/upload', upload.single("image"), (req, res) => {

    res.send(`upload`);
});

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



////-----body parser--

const bodyParser = require('body-parser');
const session = require('express-session');


// chat stuff java
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}



//starting------



//render query
app.get('/users', function (req, res) {
    res.render('users', users);
});

//render query
app.get('/', function (req, res) {
    res.render('login');
});


//render query for location page
// app.get('/locate', function (req, res) {
//     res.render('locate');
// });


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

// location getting starts here


// const x = document.getElementById("demo");
// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else {
//     x.innerHTML = "Geolocation is not supported by this browser.";
//   }
// }

// function showPosition(position) {
//   x.innerHTML = "Latitude: " + position.coords.latitude +
//   "<br>Longitude: " + position.coords.longitude;
// }

// function showError(error) {
//   switch(error.code) {
//     case error.PERMISSION_DENIED:
//       x.innerHTML = "User denied the request for Geolocation."
//       break;
//     case error.POSITION_UNAVAILABLE:
//       x.innerHTML = "Location information is unavailable."
//       break;
//     case error.TIMEOUT:
//       x.innerHTML = "The request to get user location timed out."
//       break;
//     case error.UNKNOWN_ERROR:
//       x.innerHTML = "An unknown error occurred."
//       break;
//   }
// }

// const x = document.getElementById("demo");
// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.watchPosition(showPosition);
//   } else {
//     x.innerHTML = "Geolocation is not supported by this browser.";
//   }
// }
// function showPosition(position) {
//   x.innerHTML = "Latitude: " + position.coords.latitude +
//   "<br>Longitude: " + position.coords.longitude;
// }

// chat functionality begins here




/////my new sql /////////////////////////////////////////////////////////////////























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


// multer set up





const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()

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