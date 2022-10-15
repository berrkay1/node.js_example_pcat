const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override')
const path = require('path');
const ejs = require('ejs');
const Photo = require('./modals/Photo');
const fs = require("fs");

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


app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort("-dateCreated");
  res.render('index', {
    photos,
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

  const uploadDir = "public/uploads";
  if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir)
  }

  let uploadImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads' + uploadImage.name;
  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads' + uploadImage.name,
    });
    res.redirect('/');
  });
});

// photoya göre özel sayfa
app.get('/photos/:id', async function (req, res) {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
});

app.get('/photos/edit/:id', async function (req, res) {
  const photo = await Photo.findOne({_id:req.params.id});
  res.render('edit', {
    photo,
  });
});

app.put("/photo/:id",async (req,res) => {
  const photo = await Photo.findOne({_id:req.params.id});

  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`)
  
})

app.delete("/photos/:id",async (req,res) => {

  const photo = await Photo.findOne({_id:req.params.id});
  let deleteImage = __dirname + "/public" + photo.image;
  fs.unlinkSync(deleteImage);
  await Photo.findByIdAndDelete(req.params.id);
  res.redirect("/")
  
})


app.listen(3000, () => {
  console.log('sunucu çalıştı');
});
