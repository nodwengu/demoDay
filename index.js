const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3018;
app.use(express.static('public'));

// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');






app.listen(PORT, function () {
    console.log(`App started on port ${PORT}`)
});