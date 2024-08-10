const Certification = require('../models/Certification');
const multer = require('multer');
const path = require('path');

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: './certifications/', // Uploads folder to store images
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB file size limit
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

// Add Certification
const addCertification = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err });
    } else {
      if (!req.file) {
        res.status(400).send({ message: 'No file selected!' });
      } else {
        const newCertification = new Certification({
          title: req.body.title,
          description: req.body.description,
          verifyLink: req.body.verifyLink,
          image: req.file.filename,
        });

        newCertification.save()
          .then(certification => res.status(200).send(certification))
          .catch(err => res.status(400).send(err));
      }
    }
  });
};

// Get Certifications
const getCertifications = (req, res) => {
  Certification.find()
    .then(certifications => res.status(200).json(certifications))
    .catch(err => res.status(400).json({ error: err.message }));
};

module.exports = { addCertification, getCertifications };
