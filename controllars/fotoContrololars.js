const Photo = require("../modals/Photo");
const fs = require("fs");

exports.getAllPhoto = async (req, res) => {
    const photos = await Photo.find({}).sort("-dateCreated");
    res.render('index', {
      photos,
    });
  }

  exports.deletePhoto = async (req,res) => {

    const photo = await Photo.findOne({_id:req.params.id});
    let deleteImage = __dirname + "/../public" + photo.image;
    fs.unlinkSync(deleteImage);
    await Photo.findByIdAndRemove(req.params.id);
    res.redirect("/")
    
  };

  exports.createdPhoto = async function (req, res) {

    const uploadDir = 'public/uploads';
    if(!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir)
    }
  
    let uploadImage = req.files.image;
    let uploadPath = __dirname + '/../public/uploads' + uploadImage.name;
    uploadImage.mv(uploadPath, async () => {
      await Photo.create({
        ...req.body,
        image: '/uploads' + uploadImage.name,
      });
      res.redirect('/');
    });
  }

  exports.getPhoto = async function (req, res) {
    const photo = await Photo.findById(req.params.id);
    res.render('photo', {
      photo,
    });
  }


  exports.getEditPhoto = async (req,res) => {
    const photo = await Photo.findOne({_id:req.params.id});
  
    photo.title = req.body.title;
    photo.description = req.body.description;
    photo.save();
  
    res.redirect(`/photos/${req.params.id}`)
    
  }