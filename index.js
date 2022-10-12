const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const Photo = require("./modals/Photo");


const app = express();



//connect DB
mongoose.connect('mongodb://localhost/pcat-test-db');

// temlete engine
app.set('view engine', 'ejs');

//middleweare
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async function (req, res) {
  const photos = await Photo.find({})
  res.render('index',{
    photos
  });
});

app.get('/add', function (req, res) {
  res.render('add');
});

app.get('/about', function (req, res) {
  res.render('about');
});

app.get('/contact', function (req, res) {
  res.render('contact');
});

// posts
app.post('/photo', async function (req, res) {
 await Photo.create(req.body);
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('sunucu çalıştı');
});
