const Skill = require('../models/Skill');
const multer = require('multer');
const path = require('path');

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: './skills',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('skillImage');

// Check file type
function checkFileType(file, cb) {
  const filetypes = /png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

const addSkill = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err });
    } else {
      if (!req.file) {
        res.status(400).send({ message: 'No file selected!' });
      } else {
        const newSkill = new Skill({
          name: req.body.name,
          imagePath: req.file.filename,
          masteryLevel: req.body.masteryLevel,
        });

        newSkill.save()
          .then(skill => res.status(200).send(skill))
          .catch(err => res.status(400).send(err));
      }
    }
  });
};

const getSkills = (req, res) => {
  Skill.find()
    .then(skills => res.status(200).json(skills))
    .catch(err => res.status(400).json({ error: err.message }));
};

module.exports = { addSkill, getSkills };
