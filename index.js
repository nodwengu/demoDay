const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const PORT = process.env.PORT || 3018;
app.use(express.static('public'));

// socket .io setup
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);





io.on('connection', (socket) => {
    console.log('a user connected');
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

  io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets
  io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
  });

  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

  

//   end setup for socket .io




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




// app.get('/chat2', (req, res) => {
//     res.send('<h1>Hello world</h1>');
//   });

  app.get('/chat2', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

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


const x = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}

const x = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
}

