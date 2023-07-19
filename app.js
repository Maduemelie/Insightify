const express = require('express');
const cors = require('cors');
const ejs = require('ejs');
const path = require('path');


const app = express();

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "public", "html"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.get('/', (req, res) => { 
    res.render('Dailypage');
}
)
module.exports = app;