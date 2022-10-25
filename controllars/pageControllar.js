const Photo = require("../modals/Photo");

exports.aboutPage = function (req, res) {
    res.render('about');
  }

  exports.contactPage = function (req, res) {
    res.render('contact');
  }

  exports.addPage = function (req, res) {
    res.render('add');
  }

  exports.getEditPage = async function (req, res) {
    const photo = await Photo.findOne({_id:req.params.id});
    res.render('edit', {
      photo,
    });
  }

