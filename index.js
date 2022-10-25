const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override')
const path = require('path');
const ejs = require('ejs');
const fotoControlars = require("./controllars/fotoContrololars");
const pageControlars = require("./controllars/pageControllar");

const app = express();

//connect DB
mongoose.connect('mongodb://localhost/pcat-test-db');

// temlete engine
app.set('view engine', 'ejs');

//middleweare
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method',{
  methods:['POST','GET']
}))

// routers
app.get('/', fotoControlars.getAllPhoto); 
app.post('/photo',fotoControlars.createdPhoto );
app.get('/photos/:id',fotoControlars.getPhoto ); // photoya göre özel sayfa
app.put("/photo/:id",fotoControlars.getEditPhoto);
app.delete("/photos/:id", fotoControlars.deletePhoto);

// pages
app.get('/add', pageControlars.addPage);
app.get('/about', pageControlars.aboutPage);
app.get('/contact', pageControlars.aboutPage);
app.get('/photos/edit/:id', pageControlars.getEditPage);


app.listen(3000, () => {
  console.log('sunucu çalıştı');
});
