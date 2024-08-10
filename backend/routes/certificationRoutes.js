const express = require('express');
const router = express.Router();
const { getCertifications, addCertification } = require('../controllers/certificationController');


router.get('/', getCertifications);


router.post('/', addCertification);

module.exports = router;
