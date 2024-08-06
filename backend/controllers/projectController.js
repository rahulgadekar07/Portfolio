//projectController.js (path:D:\Soft Skills\New folder\backend\controllers\projectController.js)
const Project = require('../models/projectModel');
const multer = require('multer');
const path = require('path');

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: './uploads/',
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
}).single('image');

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

const addProject = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err });
    } else {
      if (!req.file) {
        res.status(400).send({ message: 'No file selected!' });
      } else {
        const newProject = new Project({
          title: req.body.title,
          description: req.body.description,
          technologies: req.body.technologies ? req.body.technologies.split(",") : [],
          link: req.body.link,
          image: req.file.filename,
        });

        newProject.save()
          .then(project => res.status(200).send(project))
          .catch(err => res.status(400).send(err));
      }
    }
  });
};

const getProjects = (req, res) => {
  Project.find()
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(400).json({ error: err.message }));
};

module.exports = { addProject, getProjects };
