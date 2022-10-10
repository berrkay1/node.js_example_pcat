const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//connect schema
mongoose.connect('mongodb://localhost/pcat-test-db');

// create schema

const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

// create. a photo
Photo.create({
  title: 'photo title 1',
  description: 'phote lorem ipsum',
});

//read a photo
Photo.find({}, (err, data) => {
    console. log(data);
   });




//update photo
const id = "63448c01a98e484edaf59644";
Photo. findByIdAndUpdate(
     id, {
        title: "Photo Title 1 updated",
        description: "Photo description 1 updated"
     },
     {new:true}
     ,
     (err, data) => {
         console. log(data)

     })


//delete a photo
const id2 = '63448c01a98e484edaf59644';
Photo.findByIdAndDelete(id2, (err, data) => {
  console. log('Photo is removed..');
});
