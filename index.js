const express = require('express');
const path = require('path');
const ejs = require('ejs');

const app = express();


// temlete engine
app.set('view engine', 'ejs');

//middleweare
app.use(express.static('public'));

app.get('/', function (req, res) {
 
 res.render("index");
});

app.get('/about', function (req, res) {
 
  res.render("about");
 });

 app.get('/add', function (req, res) {
 
  res.render("add");
 });

app.get('/about', function (req, res) {
  
  res.render("about");
 });

 app.get('/contact', function (req, res) {
  // res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  res.render("contact");
 });

app.listen(3000, () => {
  console.log('sunucu çalıştı');
});
